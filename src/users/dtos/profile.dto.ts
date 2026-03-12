
import { IsNotEmpty, IsOptional, IsString, IsUrl} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";


export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional() 
  @IsUrl()
  avatar: string;

  @IsOptional()
  phone: string;

}

export class UpdatedProfileDto extends PartialType(CreateProfileDto) {} 
