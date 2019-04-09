import { Module } from '@nestjs/common';
import { StorageRecordsModule } from './components/storage-records/storage-records.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigService} from "@astra/common/services";

@Module({
  imports: [
    TypeOrmModule.forRoot({
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            database: configService.get('DB_NAME'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        inject: [ConfigService],
    }),
    StorageRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
