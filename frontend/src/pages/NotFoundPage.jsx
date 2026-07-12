import React from "react";
import { Compass } from "lucide-react";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The page you're looking for doesn't exist."
        action={<Button to="/">Back to home</Button>}
      />
    </div>
  );
}
