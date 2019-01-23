import { BaseEntity, IProjectAccount } from '@astra/common';
import {Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class ProjectAccount extends BaseEntity implements IProjectAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    login: string;

    @Column()
    @Index()
    @Unique('email')
    email: string;

    @Column()
    @Exclude()
    password: string;

    @PrimaryColumn('integer')
    @Exclude()
    projectId: number;

    @PrimaryColumn('integer')
    @Exclude()
    ownerId: number;

    @Column({ nullable: true })
    @Exclude()
    deletedAt: Date;

    constructor(partial: Partial<ProjectAccount>) {
        super();
        Object.assign(this, partial);
    }

}