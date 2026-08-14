# LeafSense backend launcher.
#
# Creates a dedicated venv (.venv) on first run, installs requirements.txt
# into it, then serves the model on port 8001 — NOT the default 8000 that
# main.py's `if __name__ == "__main__":` block hardcodes, because LeafSense
# runs alongside InsightAI-RAG, whose own backend also defaults to port
# 8000. InsightAI's config already expects the vision service at
# http://localhost:8001.
#
# Uses only the .venv it manages; never installs TensorFlow into any
# shared/global Python environment.

$ErrorActionPreference = "Stop"

$backendDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$venvDir = Join-Path $backendDir ".venv"
$venvPython = Join-Path $venvDir "Scripts\python.exe"
$requirements = Join-Path $backendDir "requirements.txt"

# --- Find a Python 3.9-3.13 interpreter (TensorFlow constraint) ---
function Find-UsablePython {
    $launcher = Get-Command py -ErrorAction SilentlyContinue
    if ($launcher) {
        $candidates = @()
        foreach ($line in @(& py -0p 2>$null)) {
            if ($line -match '3\.(9|1[0-3])') {
                $verStr = $Matches[0]
                $candidates += [PSCustomObject]@{
                    Version = [version]$verStr
                    Is64    = $line -match '\b64\b'
                    Path    = (($line -split '\s+')[-1]).Trim('"')
                }
            }
        }
        if ($candidates.Count -gt 0) {
            $best = $candidates |
                Sort-Object @{Expression = 'Is64'; Descending = $true},
                            @{Expression = 'Version'; Descending = $true} |
                Select-Object -First 1
            return $best.Path
        }
    }

    # Fallbacks: plain python / python3, only if their version is in range.
    foreach ($candidate in @('python', 'python3')) {
        $cmd = Get-Command $candidate -ErrorAction SilentlyContinue
        if (-not $cmd) { continue }
        $version = (& $candidate -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')" 2>$null)
        if ($version -match '^3\.(9|1[0-3])$') {
            return $cmd.Source
        }
    }

    # Fallback to whatever python is available
    $anyPython = Get-Command python -ErrorAction SilentlyContinue
    if ($anyPython) {
        return $anyPython.Source
    }

    throw "No Python interpreter found. Please install Python (3.9-3.13 recommended for TensorFlow)."
}

# --- Create the venv if it doesn't exist ---
if (-not (Test-Path $venvPython)) {
    $pythonExe = Find-UsablePython
    Write-Host "Creating dedicated virtual environment at $venvDir using $pythonExe ..." -ForegroundColor Cyan
    & $pythonExe -m venv $venvDir
    if ($LASTEXITCODE -ne 0) { throw "Failed to create virtual environment." }

    Write-Host "Installing LeafSense backend requirements into $venvDir ..." -ForegroundColor Cyan
    & $venvPython -m pip install -r $requirements
    if ($LASTEXITCODE -ne 0) { throw "pip install failed." }
}

# --- Serve on port 8001 (not 8000, which InsightAI-RAG's backend uses) ---
Set-Location $backendDir
Write-Host "Starting LeafSense on http://localhost:8001 ..." -ForegroundColor Green

$previousErrorActionPreference = $ErrorActionPreference
$ErrorActionPreference = "Continue"
try {
    # 2>&1 captures uvicorn's stderr startup banner so the friendly line
    # fires when the server is listening.
    & $venvPython -m uvicorn main:app --host localhost --port 8001 2>&1 | ForEach-Object {
        if ($_ -match 'Uvicorn running on') {
            Write-Host "LeafSense running on http://localhost:8001" -ForegroundColor Green
        }
        $_
    }
} finally {
    $ErrorActionPreference = $previousErrorActionPreference
}
