import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @Index()
  token: string;

  @Column()
  userId: number;

}