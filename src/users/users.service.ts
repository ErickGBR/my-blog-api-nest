import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto, UpdatedUserDto } from "./user.dto";
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

  getUserById(id: number) {
    if (!this.findOne(id)) {
      throw new ForbiddenException("User not found");
    }
    return this.userRepository.findOne({ where: { id } });
  }

  create(body: CreateUserDto) {
    const newUser = this.userRepository.create(body);
    return this.userRepository.save(newUser);
  }

  update(id: number, body: UpdatedUserDto) {
    if (!this.findOne(id)) {
      throw new NotFoundException("User not found");
    }
    return this.userRepository.update(id, body);
  }

  delete(id: number) {
    if (!this.findOne(id)) {
      throw new NotFoundException("User not found");
    }
    return this.userRepository.delete(id);
  }

  private findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
