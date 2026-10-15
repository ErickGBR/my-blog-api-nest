import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Category name", type: String })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Category slug", type: String, required: false })
  slug: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Category description", type: String, required: false })
  description: string;
}
