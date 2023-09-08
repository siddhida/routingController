// Post Entity
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}




// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class post {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     title!: string;

//     @Column()
//     description!: string;
// }
