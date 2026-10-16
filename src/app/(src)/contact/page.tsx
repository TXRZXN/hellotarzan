import ContactPage from "@/features/contact/pages/contact-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Naruechat Buranasombat for web/mobile development, freelance inquiries, or collaborations.",
};

export default function Contact() {
  return <ContactPage />;
}
