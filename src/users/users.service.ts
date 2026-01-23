import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto, UpdatedUserDto } from "./user.dto";

@Injectable()
export class UsersService {
  private users = [
    {
      id: "1",
      name: "Gabriela",
      email: "gabriela@example.com",
    },
    {
      id: "2",
      name: "Daniela Cruz",
      email: "daniela@example.com",
    },
    {
      id: "3",
      name: "Marcela Alejandra",
      email: "marcela@example.com",
    },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];

    if (user.id === "1") {
      throw new ForbiddenException("You are not allowed to access this user");
    }

    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      id: `${this.users.length + 1}`,
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, body: UpdatedUserDto) {
    const position = this.findOne(id);
    const currentUser = this.users[position];

    const updatedUser = {
      ...currentUser,
      ...body,
      id: currentUser.id,
    };

    this.users[position] = updatedUser;

    return updatedUser;
  }

  delete(id: string) {
    const position = this.findOne(id.toString());
    this.users.splice(position, 1);
    return { message: "User deleted successfully" };
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException("User not found");
    }

    return position;
  }
}
