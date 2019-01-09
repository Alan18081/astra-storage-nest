import {Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/user.entity';

@Entity()
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @Index()
  token: string;

  @Column()
  userId: number;

  @OneToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

}