import { Queues } from '../enums';
import {GrpcOptions, RmqOptions, Transport} from '@nestjs/microservices';
import { RABBIT_MQ_URL } from '../config';
import { join } from 'path';

export const createClientOptions = (packageName: string, path: string): GrpcOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      package: packageName,
      protoPath: join(__dirname, path),
    },
  };
};