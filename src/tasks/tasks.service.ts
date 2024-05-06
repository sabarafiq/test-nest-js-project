import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(user: any, createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel({ ...createTaskDto, user: user.userId });
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find();
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
