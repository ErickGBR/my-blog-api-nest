import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { Category } from "./category.entity";

@Entity({
    name: 'post',
})

export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    content: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'cover_img',
        nullable: true,
    })
    coverImg: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'summary',
        nullable: true
    })
    summary: string;

    @Column({
        type: 'boolean',
        default: true,
        name: 'is_draft',
    })
    isDraft: boolean;

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

    @ManyToOne(() => UserEntity, (user) => user.posts, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => Category, (category) => category.posts, { nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

}
