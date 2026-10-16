"use client"

import { useState } from "react"
import { ContactFormData, ContactApiResponse } from "@/features/contact/types/contact.types"

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ isOpen: boolean; type: "success" | "error"; message: string }>({
    isOpen: false,
    type: "success",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }))
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data: ContactApiResponse = await res.json()

      if (data.success) {
        setToast({
          isOpen: true,
          type: "success",
          message: "ขอบคุณสำหรับข้อความ! ผมจะรีบติดต่อกลับโดยเร็วที่สุดครับ (Message sent successfully)",
        })
        resetForm()
      } else {
        const errorMsg = data.error || "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง"
        setToast({
          isOpen: true,
          type: "error",
          message: errorMsg,
        })
      }
    } catch (error) {
      console.error(error)
      setToast({
        isOpen: true,
        type: "error",
        message: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    toast,
    closeToast,
    handleChange,
    submitForm,
    resetForm,
  }
}
