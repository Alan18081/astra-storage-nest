import { Module } from '@nestjs/common';
import { StorageRecordsModule } from './components/storage-records/storage-records.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataServiceConfig } from '@astra/common/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
       type: 'mongodb',
       host: DataServiceConfig.DB_HOST,
       database: DataServiceConfig.DATABASE,
       entities: ["src/**/**.entity{.ts,.js}"],
       synchronize: true,
    }),
    StorageRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
