import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity({
  name: "category",
})
export class Category {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "varchar",
    length: 120,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 120,
    unique: true,
  })
  slug!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  description!: string;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt!: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts!: Post[];
}
