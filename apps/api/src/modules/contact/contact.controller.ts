import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post()
  @HttpCode(201)
  @Throttle({ default: { ttl: 60000, limit: 3 } })
  create(@Body() dto: CreateContactDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }
}
