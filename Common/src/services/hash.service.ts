import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

    private readonly ROUNDS = 10;

    async generateHash(str: string): Promise<string> {
        return bcrypt.hash(str, this.ROUNDS);
    }

    async compareHash(str: string, hash: string): Promise<boolean> {
        return bcrypt.compare(str, hash);
    }
}