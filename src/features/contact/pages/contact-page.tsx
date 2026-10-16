import ContactFormWidget from "@/features/contact/components/contact-form-widget"
import { contactInfoData } from "@/features/contact/data/contact.data"

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project in mind, need custom trading strategy development, or want to collaborate? I&apos;d love to hear from you!
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="animate-fade-in">
        <ContactFormWidget contactInfo={contactInfoData} showForm={true} />
      </div>
    </div>
  )
}
