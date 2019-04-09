import { Queues } from '../enums';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { RABBIT_MQ_URL } from '../config';

export const createClientOptions = (queue: Queues, url: string): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      queue,
      urls: [RABBIT_MQ_URL],
    },
  };
};