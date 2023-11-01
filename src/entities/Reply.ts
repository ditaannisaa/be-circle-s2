import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Column,

} from "typeorm"
import {Threads} from "./Threads"
import {User} from "./User"

@Entity({name: "Reply"})
export class Reply{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Threads, (thread) => thread.reply, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({name: "thread_id"})
    thread: Threads;

    @ManyToOne(() => User, (user) => user.reply, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({name: "user_id"})
    user: User

}