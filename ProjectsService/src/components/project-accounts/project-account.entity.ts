import { BaseEntity, IProjectAccount } from '@astra/common';
import {Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';

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
    password: string;

    @PrimaryColumn('integer')
    projectId: number;

    @Column({ nullable: true })
    deletedAt: Date;

    constructor(partial: Partial<ProjectAccount>) {
        super();
        Object.assign(this, partial);
    }

}