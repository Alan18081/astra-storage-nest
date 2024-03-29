import {IUser, Roles} from 'astra-common';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
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
    @Index()
    email: string;

    @Column({ type: 'varchar', nullable: true })
    googleId: string;

    @Exclude()
    @Column({ type: 'varchar', nullable: true })
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

}
