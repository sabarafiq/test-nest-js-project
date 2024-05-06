import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { User } from "./user.schema";
import { Model } from 'mongoose';      

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed(): Promise<any> {
    const adminExists = await this.user.findOne({ role: 'admin' });
    if (!adminExists){
    const adminUser = {
        username: 'admin',
        password: "admin123",  
        email: "firstadmin@gmail.com",
        role: 'admin'
      };
      await this.user.create(adminUser);
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
 
  async drop(): Promise<any> {
    
  }
}