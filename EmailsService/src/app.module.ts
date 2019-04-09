import { Module } from '@nestjs/common';
import { EmailSendingModule } from './components/email-sending/email-sending.module';

@Module({
  imports: [
      EmailSendingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
