import {EntityRepository, Repository} from 'typeorm';
import {RefreshToken} from './refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken> {

    async findOneByUserId(userId: number): Promise<RefreshToken | undefined> {
        return this.findOne({ where: { userId } });
    }

    async findOneByToken(token: string): Promise<RefreshToken | undefined> {
        return this.findOne({ where: { token } });
    }

    async removeById(id: number): Promise<void> {
        await this.delete({ id });
    }

}
