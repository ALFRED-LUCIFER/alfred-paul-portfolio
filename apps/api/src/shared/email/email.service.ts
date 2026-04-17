import { Injectable, Logger } from '@nestjs/common'
import { Resend } from 'resend'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private readonly resend = new Resend(process.env.RESEND_API_KEY)
  private readonly from = process.env.RESEND_FROM_EMAIL || 'portfolio@alfredpaul.dev'
  private readonly alfredEmail = process.env.ALFRED_EMAIL || 'alfred.v.paul@gmail.com'

  async sendContactNotification(data: {
    name: string
    email: string
    phone?: string
    subject: string
    budget?: string
    message: string
  }) {
    const { error } = await this.resend.emails.send({
      from: this.from,
      to: this.alfredEmail,
      subject: `[Portfolio] New contact: ${data.subject}`,
      html: `
        <h2>New contact form submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          ${data.phone ? `<tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>` : ''}
          <tr><td><strong>Subject:</strong></td><td>${data.subject}</td></tr>
          ${data.budget ? `<tr><td><strong>Budget:</strong></td><td>${data.budget}</td></tr>` : ''}
          <tr><td><strong>Message:</strong></td><td>${data.message}</td></tr>
        </table>
      `,
    })

    if (error) {
      this.logger.error('Failed to send notification email', error)
    }
  }

  async sendConfirmation(to: string, name: string) {
    const { error } = await this.resend.emails.send({
      from: this.from,
      to,
      subject: "Thanks for reaching out — Alfred Paul",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for getting in touch! I've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to connect with me on
           <a href="https://www.linkedin.com/in/alfred-paul-56438454">LinkedIn</a>.
        </p>
        <br/>
        <p>— Alfred Paul<br/>Team Leader · AI & Software Engineering · Dubai, UAE</p>
      `,
    })

    if (error) {
      this.logger.error('Failed to send confirmation email', error)
    }
  }
}
