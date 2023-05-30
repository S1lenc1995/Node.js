import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinTable,
} from "typeorm";
import  UserEntity  from "./user"
@Entity()
export class PostEntity extends BaseEntity {
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

    @ManyToOne((type) => UserEntity, (user) => user.posts)
    @JoinTable()
    author: UserEntity
}

