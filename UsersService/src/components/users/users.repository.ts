import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findById(id: number): Promise<User | undefined> {
        return super.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return super.findOne({ email });
    }

    async findOneByGoogleId(googleId: string): Promise<User | undefined> {
        return super.findOne({ googleId });
    }

    async updateOne(id: number, data: Partial<User>): Promise<User | undefined> {
        await super.update({ id }, data);
        return this.findById(id);
    }

    async removeOne(id: number): Promise<void> {
        await super.delete({ id });
    }
}