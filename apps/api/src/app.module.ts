import { Module } from '@nestjs/common'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { ContactModule } from './modules/contact/contact.module'
import { HealthModule } from './modules/health/health.module'
import { PrismaModule } from './shared/prisma/prisma.module'
import { EmailModule } from './shared/email/email.module'

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 5 }]),
    PrismaModule,
    EmailModule,
    ContactModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
