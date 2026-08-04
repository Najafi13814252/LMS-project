"use client"
import { TooltipProvider } from "@/components/ui/tooltip"

export function EditorProvider({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}