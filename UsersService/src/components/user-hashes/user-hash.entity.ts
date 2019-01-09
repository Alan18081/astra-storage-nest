import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserHash {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  hash: string;

  @Column()
  userId: number;

}