export interface SendMailData {
  subject: string
  body: string
}

export interface MailAdapter {
  sendEmail: (mail: SendMailData) => Promise<void>
}
