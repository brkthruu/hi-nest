import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  intra_id: string;

  @Column()
  nickname: string;
}
