"use client"

import { useEffect } from "react"
import { CheckCircle2, AlertCircle, X } from "lucide-react"
import { cn } from "@/shared/lib/utils"

export interface ToastProps {
  isOpen: boolean
  type: "success" | "error" | "info"
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({
  isOpen,
  type,
  message,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  const isSuccess = type === "success"
  const isError = type === "error"

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-in-right",
        isSuccess && "bg-white/95 dark:bg-gray-900/95 border-green-500/30 text-gray-900 dark:text-gray-100",
        isError && "bg-white/95 dark:bg-gray-900/95 border-red-500/30 text-gray-900 dark:text-gray-100",
        type === "info" && "bg-white/95 dark:bg-gray-900/95 border-blue-500/30 text-gray-900 dark:text-gray-100"
      )}
    >
      {isSuccess && (
        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
      )}
      {isError && (
        <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
      )}
      <p className="text-sm font-medium leading-snug">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer ml-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
