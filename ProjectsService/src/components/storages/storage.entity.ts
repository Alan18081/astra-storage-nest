import { BaseEntity, IStorage, StorageType } from '@astra/common';
import { toNumber, toString } from 'lodash';
import { Column, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

export class Storage extends BaseEntity implements IStorage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'text', default: '' })
  description?: string;

  @Column('varchar')
  @Index()
  path: string;

  @Column()
  projectId: number;

  @ManyToOne(type => Project, project => project.storages)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ type: 'int', default: StorageType.FREE })
  typeId: StorageType;

  constructor(partial: Partial<Storage>) {
    super();
    Object.assign(this, partial);
  }
}