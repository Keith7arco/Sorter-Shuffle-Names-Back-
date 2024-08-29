import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;

@Schema()
export class Rol {
  @Prop()
  name: string;
  @Prop()
  grade:number | null;
}

export const RolSchema = SchemaFactory.createForClass(Rol);