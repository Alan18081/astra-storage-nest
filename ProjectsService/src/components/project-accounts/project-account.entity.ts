import { BaseEntity, IProjectAccount } from '@astra/common';
import {Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Expose} from 'class-transformer';

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
    @Expose()
    password: string;

    @PrimaryColumn('integer')
    @Expose()
    projectId: number;

    @PrimaryColumn('integer')
    @Expose()
    ownerId: number;

    @Column({ nullable: true })
    @Expose()
    deletedAt: Date;

    constructor(partial: Partial<ProjectAccount>) {
        super();
        Object.assign(this, partial);
    }

}