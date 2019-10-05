import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}

@Entity()
export class User extends BaseEntity {
  [key: string]: any;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}
