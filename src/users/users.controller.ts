import { Controller, Get } from '@nestjs/common';

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
            }
    ];

    @Get()
    getAllUsers(): User[] {
        return this.users;
    }
}
