import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users/user.schema";
import { UsersSeeder } from "./users/users.seeder";

seeder({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sabarafique:agCFcusdhc9kcWQR@cluster0.cgy53mb.mongodb.net/', {dbName: 'nest_database'}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);