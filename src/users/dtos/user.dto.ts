import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateProfileDto, UpdatedProfileDto } from "./profile.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile!: CreateProfileDto;
}

export class CreateWithoutProfileDto extends OmitType(CreateUserDto, ['profile'] as const) {}

export class UpdatedUserDto extends PartialType(CreateWithoutProfileDto) {
  @ValidateNested()
  @Type(() => UpdatedProfileDto)
  @IsOptional()
  profile?: UpdatedProfileDto;
}

/**
 * write DTO to delete vsc
 */
export class DeleteUserDto{

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

}
