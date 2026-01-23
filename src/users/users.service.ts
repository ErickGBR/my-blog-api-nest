import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "Gabriela",
            email: "gabriela@example.com"
        },
        {
            id: 2,
            name: "Daniela Cruz",
            email: "daniela@example.com"
        },
        {
            id: 3,
            name: "Marcela Alejandra",
            email: "marcela@example.com"
        }
    ];


    findAll() {
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: { name: string; email: string }) {
        const newUser = {
            id: this.users.length + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }
    
    delete(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return { message: "User deleted successfully" };
    }
}
