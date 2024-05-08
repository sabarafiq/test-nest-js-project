import { IsEmail, IsEnum, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { UserRole } from '../user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  invitationToken: string;
}

