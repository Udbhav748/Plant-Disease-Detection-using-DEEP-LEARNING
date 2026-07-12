import React, { useCallback, useRef, useState } from "react";
import { UploadCloud, ImageIcon, X } from "lucide-react";
import Button from "../ui/Button";

export default function UploadZone({ previewUrl, onFileSelect, onClear, disabled = false }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragActive(false);
      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  if (previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark">
        <img src={previewUrl} alt="Selected leaf preview" className="mx-auto max-h-96 w-full object-contain" />
        {!disabled && (
          <button
            onClick={onClear}
            aria-label="Remove selected image"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors duration-150"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragActive(true);
      }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Upload a leaf image by dragging and dropping or browsing"
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click();
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 text-center transition-colors duration-150 sm:p-16 ${
        isDragActive
          ? "border-accent bg-accent/5"
          : "border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark hover:border-accent/50"
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface dark:bg-surface-dark shadow-soft">
        <UploadCloud className="h-6 w-6 text-accent" aria-hidden="true" />
      </div>
      <div>
        <p className="font-heading text-base font-semibold text-text-primary dark:text-text-primary-dark">
          Drag &amp; drop a leaf photo here
        </p>
        <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
          JPG or PNG, up to a few MB
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        icon={ImageIcon}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
        disabled={disabled}
      >
        Browse Image
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
