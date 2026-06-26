"use client";

import { ToastProvider } from "./Toast";
import { CommandPalette } from "./CommandPalette";

export function ClientProviders() {
  return (
    <>
      <ToastProvider />
      <CommandPalette />
    </>
  );
}
