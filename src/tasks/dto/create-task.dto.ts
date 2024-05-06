import { IsEnum, IsString, IsDate, MinLength,MaxLength, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.schema';
import { IsFutureDate } from '../decorators/is-future-date.decorator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsString()
  // @IsFutureDate({ message: 'Due date must be today or in the future' })
  dueDate: Date;

  @IsString()
  @MaxLength(50)
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
