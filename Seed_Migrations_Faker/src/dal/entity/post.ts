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
    header: string;

    @Column()
    content: string;

    @Column()
    genre: string;

    @Column()
    isPrivate: boolean;

    @Column()
    createDate: Date;

    @Column({ default: false })
    deleted: boolean;

    @ManyToOne((type) => UserEntity, (user) => user.posts)
    @JoinTable()
    author: UserEntity
}

export { Post as PostEntity };

