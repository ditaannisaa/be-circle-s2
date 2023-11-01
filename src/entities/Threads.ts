import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn,
    OneToMany, 
    ManyToMany,
    JoinTable
} from "typeorm"
import { User } from "./User"
import { Likes } from "./Likes";
import { Reply } from "./Reply"

@Entity()
export class Threads {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({nullable: true})
    image: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date;

    @ManyToOne(() => User, (user) => user.threads, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToMany(() => Likes, (like) => like.thread)
    like: Likes[];

    @OneToMany(() => Reply, (reply) => reply.thread, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    reply: Reply[];


    
}
