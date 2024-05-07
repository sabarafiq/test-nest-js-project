import { Controller,Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from './user.schema';
import { Roles } from 'src/common/decorators/roles.deorators';

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
  
  @Post('invite')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN)
  inviteUser(@Body('email') email: string) {
    return this.usersService.inviteUser(email);
  }
}
