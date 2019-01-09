import { Queues } from '../enums';
import { RmqOptions } from '@nestjs/microservices';
export declare const createClientOptions: (queue: Queues) => RmqOptions;
