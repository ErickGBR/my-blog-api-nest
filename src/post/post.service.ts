import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find();
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
    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.findPost(id);
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return this.postRepository.delete(id);
  }

  private findPost(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }
}
