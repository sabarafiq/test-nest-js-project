import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
  
  async validateInvitation(token: string, email: string): Promise<Boolean> {1
  
    try {
      const decoded = this.jwtService.verify(token);
      console.log(email);
      console.log(decoded.email);
      if (decoded.email !== email) {
          throw new UnauthorizedException('Invalid token for the given email.');
      }

      if (new Date() > new Date(decoded.exp*1000)) {
          throw new UnauthorizedException('Token has expired.');
      }

      return true;
  } catch (error) {
      console.error('Error validating token:', error);
      return false;
  }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const valid = await this.validateInvitation(createUserDto.invitationToken, createUserDto.email);
    if (!valid) {
      throw new BadRequestException('Invalid or expired token.');
    }
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

  async inviteUser(email: string): Promise<{link: string; token: string; message: string }> {
    const token = this.jwtService.sign(
      { email },
      { expiresIn: '48h' }
    );

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 48);
    await this.userModel.findOneAndUpdate(
      { email },
      {
        email,
        invitationToken: token,
        tokenExpiration: expiration,
      },
      {
        new: true,
        upsert: true, 
        setDefaultsOnInsert: true
      }
    );

    const link = `localhost:3000/users/signup?token=${token}`;

    return {
      link,
      token,
      message: 'Invitation sent successfully.',
    };
  }
}
