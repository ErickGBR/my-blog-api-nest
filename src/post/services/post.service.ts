import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../entities/post.entity";
import { Category } from "../entities/category.entity";
import { Repository, DeepPartial } from "typeorm";
import { OpenaiService } from "src/ai/services/openai.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly openaiService: OpenaiService
  ) { }

  create(createPostDto: CreatePostDto, userId: number) {
    const categories: DeepPartial<Category>[] = createPostDto.categories
      ? createPostDto.categories.map((id) => ({ id }))
      : [];
    return this.postRepository.save({
      ...createPostDto,
      user: { id: userId },
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

  async publish(id: number, userId: number) {
    const post = await this.findPost(id);
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    if (post.user.id !== userId) {
      throw new NotFoundException("You are not authorized to publish this post");
    }

    
    const summary = await this.openaiService.generateSummary(post.content);
    const coverImage = await this.openaiService.generateImage(post.title);
    
    post.summary = summary;
    post.coverImg = coverImage;
    post.isDraft = false;
    
    if (!post.content || post.title.trim() === "") {
      throw new NotFoundException("Cannot publish a post without content");
    }
    const updatedPost = this.postRepository.merge(post, { summary, coverImg: coverImage, isDraft: false });
    this.postRepository.save(updatedPost);
    return this.findOne(id);
  }

}
