import { IsOptional, IsUUID, IsIn } from 'class-validator';

export class FindTasksQueryDto {
  @IsOptional()
  @IsUUID()
  userId?: string; 

  @IsOptional()
  status?: string; 
}
