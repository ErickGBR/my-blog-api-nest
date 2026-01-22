    import { Controller, Get, Body, Param, Post, Delete } from '@nestjs/common';

    interface User {
        id: number;
        name: string;
        email: string;
    }

    @Controller('users')
    export class UsersController {
        private users: User[] = [
            {
                id: 1,
                name: 'Alice',
                email: "alice@example.com"
            },
            {
                id: 2,
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
            const user = this.users.find(user => user.id === parseInt(id));
            if (!user) {
                return {
                    error: "User not found"
                }
            }
            return user;
        }

        @Post()
        createUser(@Body() body:User): User {
            this.users.push(body);
            return body;
        }

        @Delete(":id")
        deleteUser(@Param("id") id: string): { message: string } {
            this.users = this.users.findIndex(user => user.id === parseInt(id)) !== -1 ? this.users.filter(user => user.id !== parseInt(id)) : this.users;
            return {
                message: "User deleted successfully"
            }
        }
    }
