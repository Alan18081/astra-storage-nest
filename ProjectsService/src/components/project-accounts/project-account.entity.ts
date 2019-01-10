import { toNumber } from 'lodash';
import { BaseEntity, IProjectAccount } from '@astra/common';
import { Column, Index, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}