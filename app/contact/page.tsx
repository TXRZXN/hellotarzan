import ContactFormWidget from "@/components/contact-form-widget"

export default function Contact() {
  const contactInfo = {
    email: "naruechat.b@gmail.com",
    phone: "+66 (0) 92 349 2220",
    location: "Nonthaburi, Thailand",
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing
          together!
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="animate-fade-in">
        <ContactFormWidget contactInfo={contactInfo} showForm={true} />
      </div>
    </div>
  )
}
