import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../entities/post.entity";
import { Category } from "../entities/category.entity";
import { Repository, DeepPartial } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const categories: DeepPartial<Category>[] = createPostDto.categories
      ? createPostDto.categories.map((id) => ({ id }))
      : [];
    return this.postRepository.save({
      ...createPostDto,
      user: { id: createPostDto.userId },
      categories,
    });
  }

  findAll() {
    return this.postRepository.find({ relations: ["user", "categories"] });
  }

  async findOne(id: number) {
    const post = await this.findPost(id);
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findPost(id);
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const updatePayload: DeepPartial<Post> = {};
    if (updatePostDto.title !== undefined)
      updatePayload.title = updatePostDto.title;
    if (updatePostDto.content !== undefined)
      updatePayload.content = updatePostDto.content;
    if (updatePostDto.coverImage !== undefined)
      updatePayload.coverImg = updatePostDto.coverImage;
    if (updatePostDto.summary !== undefined)
      updatePayload.summary = updatePostDto.summary;
    if (updatePostDto.isDraft !== undefined)
      updatePayload.isDraft = updatePostDto.isDraft;
    if (updatePostDto.categoryId !== undefined) {
      updatePayload.categories = updatePostDto.categoryId
        ? [{ id: updatePostDto.categoryId }]
        : [];
    }

    await this.postRepository.update(id, updatePayload);
    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findPost(id);
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return this.postRepository.delete(id);
  }

  private findPost(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: ["user", "categories"],
    });
  }
}
