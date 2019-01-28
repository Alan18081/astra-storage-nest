import { Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

@Injectable()
export class SerializerService {

  exclude(obj: object): object {
    return classToPlain(obj);
  }

}