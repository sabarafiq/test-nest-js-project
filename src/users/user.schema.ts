import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/task.schema';

export type UserDocument = Document<User>;
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  invitationToken: string;

  @Prop()
  tokenExpiration: Date;


  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}])
  tasks: Task
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next: Function) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

