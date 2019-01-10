import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findById(id: number): Promise<User | undefined> {
        return await this.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.findOne({ email });
    }

    async updateOne(id: number, data: Partial<User>): Promise<User | undefined> {
        await this.update({ id }, data);
        return await this.findById(id);
    }

    async removeOne(id: number): Promise<void> {
        await this.delete({ id });
    }
}