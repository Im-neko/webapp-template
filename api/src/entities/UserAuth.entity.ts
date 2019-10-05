import { Entity, PrimaryColumn, Column, Index, BaseEntity } from "typeorm";

export interface IUserAuth {
  email: string;
  password: string;
  user_id: number;
}

@Entity()
export class UserAuth extends BaseEntity {
  [key: string]: any;

  @PrimaryColumn()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column()
  user_id: number;
}
