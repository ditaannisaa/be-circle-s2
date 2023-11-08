import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Threads } from "./Threads";
import { Reply } from "./Reply";
import { Likes } from "./Likes";
import { Follow } from "./Follow";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(() => Threads, (thread) => thread.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  threads: Threads[];

  @OneToMany(() => Reply, (reply) => reply.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  reply: Reply[];

  @OneToMany(() => Likes, (like) => like.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  like: Likes[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: "followers",
    joinColumn: {
      name: "follower_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "following_id",
      referencedColumnName: "id",
    },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  // @OneToMany(() => Follow, (follow) => follow.follower_id, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // @JoinColumn()
  // follower: User[];

  // @OneToMany(() => Follow, (follow) => follow.following_id, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // @JoinColumn()
  // following: User[];
}
