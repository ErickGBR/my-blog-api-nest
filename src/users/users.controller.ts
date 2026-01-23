import { Controller, Get, Body, Param, Post, Delete, Put, NotFoundException } from '@nestjs/common';

interface User {
    id: string;
    name: string;
    email: string;
}

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: "1",
            name: 'Alice',
            email: "alice@example.com"
        },
        {
            id: "2",
            name: 'Bob',
            email: "bob@example.com"
        }

    ];

    @Get()
    getAllUsers(): User[] {
        return this.users;
    }

    @Get(":id")
    findUser(@Param("id") id: string): User | { error: string } {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post()
    createUser(@Body() body: User): User {

        const newUser = {
            ...body,
            id: `${this.users.length + 1}`
        }
        this.users.push(newUser);
        return newUser;
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string): { message: string } {
        this.users = this.users.findIndex(user => user.id === id) !== -1 ? this.users.filter(user => user.id !== id) : this.users;
        return {
            message: "User deleted successfully"
        }
    }

    @Put(":id")
    updateUser(@Param("id") id: string, @Body() body: User): User | { error: string } {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException("User not found")
        }

        const currentUser = this.users[userIndex];
        if (currentUser?.email && body.email.includes("@")) {
            return {
                error: "Invalid email format"
            };
        }

        const updatedUser = {
            ...currentUser,
            ...body,
            id: currentUser.id
        }
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }
}