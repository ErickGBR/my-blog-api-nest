import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "User first name", type: String })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "User last name", type: String })
  lastName!: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: "User avatar URL", type: String, required: false })
  avatar!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "User phone number", type: String, required: false })
  phone!: string;
}

export class UpdatedProfileDto extends PartialType(CreateProfileDto) {}
