import {
    Entity,
    Index,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinTable,
    PrimaryColumn,
    OneToMany,
} from "typeorm"


@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @PrimaryColumn()
    @Index()    // Тут додав індекс, тому що користувачів ми шукаємо по email і відповідно index в цьому місці дасть можливість отримувати дані швидше
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    notificationSent: boolean;

    @Column({ type: 'enum', enum: ['inapp', 'email'], default: 'email' })
    notificationChannel: 'inapp' | 'email';
}

export { User as UserEntity };