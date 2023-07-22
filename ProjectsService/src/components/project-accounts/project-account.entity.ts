import { BaseEntity, IProjectAccount } from 'astra-common';
import {Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class ProjectAccount extends BaseEntity implements IProjectAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    login: string;

    @Column()
    @Index()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @PrimaryColumn('integer')
    projectId: number;

    @Column({ nullable: true })
    @Exclude()
    deletedAt: Date;

    constructor(partial: Partial<ProjectAccount>) {
        super();
        Object.assign(this, partial);
    }

}
