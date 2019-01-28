import { Module } from '@nestjs/common';
import { SerializerService } from '@astra/common/services';

@Module({
  providers: [SerializerService],
  exports: [SerializerService],
})
export class CoreModule {}