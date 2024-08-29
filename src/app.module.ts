import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { RolesModule } from './roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PersonsModule, 
    RolesModule,
    MongooseModule.forRoot('mongodb+srv://threads-user:12345@cluster0.qhqurym.mongodb.net/PrivSorter?retryWrites=true&w=majority&appName=Cluster0')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
