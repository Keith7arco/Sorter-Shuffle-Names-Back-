import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Rol } from './schemas/roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Rol.name) private rolModel: Model<Rol>) {}

  create(createRoleDto: CreateRoleDto) {
    const rolToSave=this.rolModel.create({
      name:createRoleDto.name,
      grade:createRoleDto.grade || null
    });
    return rolToSave;
  }

  findAll() {
    return this.rolModel.find().exec();
  }

  findOne(id: string) {
    return this.rolModel.findById(id).exec();
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolModel.findByIdAndUpdate(id,updateRoleDto,{new:true}).exec();
  }

  remove(id: string) {
    return this.rolModel.findByIdAndDelete(id).exec();
  }
}
