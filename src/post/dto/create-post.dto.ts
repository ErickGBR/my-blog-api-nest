import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsString()
    @IsOptional()
    coverImg: string;

    @IsString()
    @IsOptional()
    summary: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsOptional()
    categoryId: number;
}
