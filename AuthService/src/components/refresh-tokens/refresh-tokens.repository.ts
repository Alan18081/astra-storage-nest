import {EntityRepository, Repository} from 'typeorm';
import {RefreshToken} from './refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken> {

    async findOneByUserId(userId: number): Promise<RefreshToken | undefined> {
        return await super.findOne({ userId });
    }

    async findOneByToken(token: string): Promise<RefreshToken | undefined> {
        return await super.findOne({ token }, { relations: ['user'] });
    }

    async deleteOne(id: number): Promise<void> {
        await super.delete({ id });
    }

}