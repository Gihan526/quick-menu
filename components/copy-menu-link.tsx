"use client";

import { useState, useSyncExternalStore } from "react";

import { Check, Copy, House } from "lucide-react";

import { Button } from "@/components/ui/button";

type CopyMenuLinkProps = {
  slug: string;
  onCreateAnotherAction: () => void;
};

function subscribeToOrigin() {
  function unsubscribeFromOrigin() {
    return undefined;
  }

  return unsubscribeFromOrigin;
}

export default function CopyMenuLink({
  slug,
  onCreateAnotherAction,
}: CopyMenuLinkProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const pathname = `/restaurant/${slug}`;
  const origin = useSyncExternalStore(
    subscribeToOrigin,
    () => window.location.origin,
    () => "",
  );
  const publicUrl = origin ? `${origin}${pathname}` : pathname;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1 px-1">
        <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Public menu link
        </p>
        <p className="mt-1 truncate font-mono text-sm text-zinc-800">
          {publicUrl}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button
          aria-label={`Copy public menu link ${pathname}`}
          className="rounded-xl"
          onClick={copyLink}
          type="button"
          variant="outline"
        >
          {status === "copied" ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {status === "copied"
            ? "Copied"
            : status === "error"
              ? "Copy failed"
              : "Copy link"}
        </Button>
        <Button
          className="rounded-xl"
          onClick={onCreateAnotherAction}
          type="button"
        >
          <House aria-hidden="true" />
          Create another menu
        </Button>
      </div>
      <span aria-live="polite" className="sr-only">
        {status === "copied"
          ? "Public menu link copied"
          : status === "error"
            ? "Could not copy the public menu link"
            : ""}
      </span>
    </div>
  );
}
