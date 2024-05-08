import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import mongoose, { Model } from 'mongoose';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(user: any, createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel({ ...createTaskDto, user: user.userId });
    return createdTask.save();
  }

  async findAllWithFilters(query: FindTasksQueryDto, userId: string): Promise<Task[]> {
    let conditions: any = {}; 
    if(query.userId)
    {
      conditions.user = query.userId;
    }
    else
    {
      conditions.user = userId;
    }
    if (query.status) {
      conditions.status = query.status;
    }

    console.log('Query Conditions:', conditions);
    return this.taskModel.find(conditions).exec(); 
  }
  
  async findAllByUser(userId: string, query: FindTasksQueryDto): Promise<Task[]> {
    const conditions: any = { user: userId };
    if (query.status) {
      conditions.status = query.status;
    }

    console.log('Query Conditions:', conditions);
    return this.taskModel.find(conditions).exec(); 
  }


  async findOne(id: string):Promise<Task | null> {
    return this.taskModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateTaskDto): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  

  async delete(id: string): Promise<any> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
