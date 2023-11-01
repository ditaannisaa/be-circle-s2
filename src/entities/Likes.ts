import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany, 
    JoinColumn, 
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne
 } from "typeorm"
import { Threads } from "./Threads";
import { User } from "./User"

@Entity({name: "likes"})
export class Likes{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Threads, (thread) => thread.like, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({name: "thread_id"})
    thread: Threads[];

    @ManyToOne(() => User, (user) => user.like, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({name: "user_id"})
    user: User[];
}