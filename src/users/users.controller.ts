import { Controller, Get, Body, Param, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdatedUserDto } from './user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor( private usersService: UsersService ) {}

    @Get()
    getAllUsers(){
        return this.usersService.findAll();
    }

    @Get(":id")
    findUser(@Param("id") id: string): User | { error: string } {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() body: CreateUserDto): CreateUserDto {
        return this.usersService.create(body);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string): { message: string } {
        return this.usersService.delete(id);
    }

    @Put(":id")
    updateUser(@Param("id") id: string, @Body() body: UpdatedUserDto): User | { error: string } {
       return this.usersService.update(id, body);
    }
}