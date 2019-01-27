import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findById(id: number): Promise<User | undefined> {
        return this.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ email });
    }

    async findOneByGoogleId(googleId: string): Promise<User | undefined> {
        return this.findOne({ googleId });
    }

    async updateOneAndFind(id: number, data: Partial<User>): Promise<User | undefined> {
        await this.update({ id }, data);
        return this.findById(id);
    }

    async updateOne(id: number, data: Partial<User>): Promise<void> {
        await this.update({ id }, data);
    }

    async removeById(id: number): Promise<void> {
        await this.delete({ id });
    }
}