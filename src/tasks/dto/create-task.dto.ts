import { IsEnum, IsString, IsDate, MinLength,MaxLength, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.schema';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsString()
  dueDate: Date;

  @IsString()
  @MaxLength(50)
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
