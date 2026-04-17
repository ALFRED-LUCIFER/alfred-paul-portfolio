import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma/prisma.service'
import { EmailService } from '../../shared/email/email.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  async create(dto: CreateContactDto) {
    const submission = await this.prisma.contactSubmission.create({
      data: dto,
    })

    await Promise.all([
      this.email.sendContactNotification(dto),
      this.email.sendConfirmation(dto.email, dto.name),
    ])

    return { id: submission.id, message: 'Message sent successfully' }
  }

  findAll() {
    return this.prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}
