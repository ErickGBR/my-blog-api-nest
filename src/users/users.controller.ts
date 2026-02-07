import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Delete,
  Put,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateUserDto, UpdatedUserDto } from "./user.dto";
import { User } from "./user.model";  //TODO: Remove this
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findUser(@Param("id", ParseIntPipe) id: number){
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto){
    return this.usersService.create(body);
  }

  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number){
    return this.usersService.delete(id);
  }

  @Put(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdatedUserDto,
  ){
    return this.usersService.update(id, body);
  }
}
