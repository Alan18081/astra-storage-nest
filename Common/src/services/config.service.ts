import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import {Injectable} from "@nestjs/common";

@Injectable()
export class ConfigService {

  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

}