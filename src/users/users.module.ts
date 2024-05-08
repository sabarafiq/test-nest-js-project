import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
UserSchema

@Module({
  imports: [
    JwtModule.register({
      secret: 'abcd123###',
      signOptions: { expiresIn: '200s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, JwtModule] 
})
export class UsersModule {}
