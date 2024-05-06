import { IsNotEmpty, IsEmail } from 'class-validator';

export class GetUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
