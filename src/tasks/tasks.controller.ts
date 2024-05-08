import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/interfaces/user.interface';
import { GetUser } from 'src/users/decorators/user.decorator';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {  
    return this.tasksService.create(user, createTaskDto);
  }

  @Get()
  findAll(@Query() query: FindTasksQueryDto, @GetUser() user: User) {
    if (user.role === 'admin') {
      return this.tasksService.findAllWithFilters(query, user.userId);
    } else {
      const tasks = this.tasksService.findAllByUser(user.userId, query);
      return tasks
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
