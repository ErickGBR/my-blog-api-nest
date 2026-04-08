import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JoinColumn, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "../../post/entities/post.entity";

@Entity({
    name: 'users',
})

export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @OneToOne(() => Profile, { nullable: true, cascade: true })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}