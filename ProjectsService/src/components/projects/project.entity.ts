import { BaseEntity, IProject } from 'astra-common';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Storage } from '../storages/storage.entity';

@Entity()
export class Project extends BaseEntity implements IProject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column('varchar')
    clientId: string;

    @Column('varchar')
    clientSecret: string;

    @Column({ type: 'integer', nullable: true })
    authProjectId?: number;

    @Column({ type: 'integer', default: 0 })
    storagesCount: number;

    @Column('integer')
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => Storage, storage => storage.project)
    storages: Storage[];

    constructor(partial: Partial<Project>) {
        super();
        Object.assign(this, partial);
    }


}
