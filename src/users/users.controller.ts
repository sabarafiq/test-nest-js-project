import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  
  @Post('login')
  login(@Body() getUserDto: GetUserDto) {
    return this.usersService.login(getUserDto);
  }

}
