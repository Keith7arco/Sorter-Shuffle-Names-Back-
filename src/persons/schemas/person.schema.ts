import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rol } from 'src/roles/schemas/roles.schema';

export type PersonDocument = HydratedDocument<Person>;

@Schema({
  timestamps:true
})
export class Person {
  @Prop()
  name: string;

  @Prop({ type:mongoose.Schema.Types.ObjectId,ref:'Rol'})
  rol: Rol;
}

export const PersonSchema = SchemaFactory.createForClass(Person);