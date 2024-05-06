import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot('mongodb+srv://sabarafique:agCFcusdhc9kcWQR@cluster0.cgy53mb.mongodb.net/', {dbName: 'nest_database'}),
    UsersModule,
    TasksModule
  ]
})
export class AppModule {}
