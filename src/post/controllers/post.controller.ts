import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from "@nestjs/common";
import { Request } from "express";
import { PostService } from "../services/post.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { AuthGuard } from "@nestjs/passport";
import { Payload } from "../../../src/auth/models/payload.models";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) { }


  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postService.create(createPostDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(":id/publish")
  async publish(@Param("id") id: string, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postService.publish(+id, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
