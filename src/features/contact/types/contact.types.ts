export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface ContactApiResponse {
  success: boolean
  error?: string
}
