import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinTable,
} from "typeorm";
import  { UserEntity }  from "./user"
@Entity()
class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    genre: string;

    @Column()
    isPrivate: boolean;

    @Column()
    createDate: Date;

    @ManyToOne((type) => UserEntity, (user) => user.posts)
    @JoinTable()
    author: UserEntity
}

export { Post as PostEntity };

