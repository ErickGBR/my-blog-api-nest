import { Test, TestingModule } from "@nestjs/testing";
import { PostController } from "./post.controller";
import { PostService } from "../services/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../entities/post.entity";
import { Category } from "../entities/category.entity";

describe("PostController", () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [Post, Category],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Post, Category]),
      ],
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
