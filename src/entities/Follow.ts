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

@Entity()
export class Follow{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    following_id: User;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    follower_id: User;
}