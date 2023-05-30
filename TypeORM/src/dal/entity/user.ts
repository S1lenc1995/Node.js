import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinTable,
    PrimaryColumn,
    OneToMany,
} from "typeorm"
import {PostEntity} from "./post"

@Entity()
class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @OneToMany((type)=> PostEntity, (post)=> post.author)
    @JoinTable()
    posts: PostEntity[]
}

export default UserEntity