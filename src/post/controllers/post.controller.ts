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
import { ApiOperation } from "@nestjs/swagger";
import { Post as PostEntity } from "../entities/post.entity";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) { }


  @ApiOperation({ summary: "Create a new post" })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postService.create(createPostDto, userId);
  }

  @ApiOperation({ summary: "Publish a post" })
  @UseGuards(AuthGuard('jwt'))
  @Post(":id/publish")
  async publish(@Param("id") id: string, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postService.publish(+id, userId);
  }

  @ApiOperation({ summary: "Get all posts" })
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary:"Get a post by ID", description: "Retrieve a post by its ID", responses: { 200: { description: "Post found", }, 404: { description: "Post not found" } } })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a post" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({ summary: "Delete a post" })
  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
