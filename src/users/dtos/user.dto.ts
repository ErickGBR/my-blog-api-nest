import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, ValidateNested} from "class-validator";
import { Type } from "class-transformer";
import { CreateProfileDto } from "./profile.dto";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}

export class UpdatedUserDto extends PartialType(CreateUserDto) {}


