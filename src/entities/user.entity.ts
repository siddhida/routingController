// src/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import {Profile} from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    username?: string;

  @Column()
    email?: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
