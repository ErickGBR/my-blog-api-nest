import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { UsersService } from "./users/users.service";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env.model";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    const myVar = this.configService.get<string>("MY_VAR");
    console.log("MY_VAR:", myVar);
    return this.appService.getHello();
  }

  @Get("my-test")
  getTestUsers() {
    return this.usersService.findAll();
  }
}
