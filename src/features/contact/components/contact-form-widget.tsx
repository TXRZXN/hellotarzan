"use client"

import type React from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Toast } from "@/shared/components/ui/toast"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { ContactInfo } from "@/features/contact/types/contact.types"
import { useContactForm } from "@/features/contact/hooks/use-contact-form"

export interface ContactFormWidgetProps {
  contactInfo: ContactInfo
  showForm?: boolean
}

export default function ContactFormWidget({ contactInfo, showForm = true }: ContactFormWidgetProps) {
  const { formData, isSubmitting, toast, closeToast, handleChange, submitForm } = useContactForm()

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center space-x-3 group">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{contactInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 group-hover:scale-105 transition-transform">
                <Phone className="h-5 w-5" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{contactInfo.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        {showForm && (
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitForm} className="space-y-4">
                {/* Honeypot field to catch automated spam bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot || ""}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={2500}
                  className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Animated Toast */}
      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />
    </>
  )
}
