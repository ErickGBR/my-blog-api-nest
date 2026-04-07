import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        length: 255
    })
    content: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'cover_img',
    })
    coverImg: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'summary',
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
}
