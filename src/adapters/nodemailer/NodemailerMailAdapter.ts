import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../MailAdapter'

var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'fbf93d58fc1183',
    pass: '4b0819e1b09934',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendEmail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe teste <test@test.com>',
      to: 'Test <test@test.com>',
      subject,
      html: body,
    })
  }
}
