import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Post title", type: String })
  title!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Post content", type: String, required: false })
  content!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Post cover image URL", type: String, required: false })
  coverImage!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Post summary", type: String, required: false })
  summary!: string;
  /*
    @IsNumber()
    @IsNotEmpty()
    userId!: number;
  */
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ description: "Post categories", type: [Number], required: false })
  categories?: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: "Post category ID", type: Number, required: false })
  categoryId?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: "Is post draft", type: Boolean, required: false })
  isDraft?: boolean;
}
