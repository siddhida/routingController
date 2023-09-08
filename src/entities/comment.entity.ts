import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Post } from './post.entity';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    commentContent!: string;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({name: 'postId'})
    post: Post;
}
