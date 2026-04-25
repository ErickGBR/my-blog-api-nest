import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto, UpdatedUserDto } from "./dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new ForbiddenException("User not found");
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = this.userRepository.create(body);
    return this.userRepository.save(newUser);
  }

  async update(id: number, body: UpdatedUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.userRepository.update(id, body);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.userRepository.delete(id);
  }

  private findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
