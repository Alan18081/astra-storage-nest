import {IUser, Roles} from '@astra/common';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'integer', default: Roles.USER })
    roleId: Roles;

    @Column('varchar')
    email: string;

    @Exclude()
    @Column()
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

}