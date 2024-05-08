import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

export type TaskDocument = Document<Task>;
export enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

@Schema()
export class Task {
  static find(arg0: { user: mongoose.Types.ObjectId; }) {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop()
  dueDate: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}])
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
