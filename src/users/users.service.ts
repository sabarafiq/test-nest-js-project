import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(req: any): Promise<{ access_token: string }> {
    const user = await this.validateUser(req.email, req.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    }
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
