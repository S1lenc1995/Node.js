import {
    Entity,
    Index,
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
    @Index()  // Тому що у нас відбувається пошук по id
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    @Index()  // Тут також можна додати індекс у випадку коли потрібно робити сорт по жанру
    genre: string;

    @Column()
    isPrivate: boolean;

    @Column()
    @Index()  // Тут також можна додати індекс у випадку коли потрібно робити сорт типу спочатку найновіші, або найстаріші 
    createDate: Date;

/*     @Column({ default: false })
    deleted: boolean; */

    @ManyToOne((type) => UserEntity, (user) => user.posts)
    @JoinTable()
    author: UserEntity
}

export { Post as PostEntity };

