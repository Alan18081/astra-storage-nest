import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findById(id: number): Promise<User | undefined> {
        return await super.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await super.findOne({ email });
    }

    async updateOne(id: number, data: Partial<User>): Promise<User | undefined> {
        await super.update({ id }, data);
        return await this.findById(id);
    }

    async removeOne(id: number): Promise<void> {
        await super.delete({ id });
    }
}