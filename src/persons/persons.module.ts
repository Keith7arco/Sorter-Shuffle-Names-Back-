import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { Person, PersonSchema } from './schemas/person.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from 'src/roles/schemas/roles.schema';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }])
  ],
})
export class PersonsModule {}
