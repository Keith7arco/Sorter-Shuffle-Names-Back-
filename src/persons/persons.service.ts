import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './schemas/person.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rol } from 'src/roles/schemas/roles.schema';

@Injectable()
export class PersonsService {

  constructor(
    @InjectModel(Person.name) private personModel: Model<Person>,
    @InjectModel(Rol.name) private readonly rolModel: Model<Rol>
) {}


  create(createPersonDto: CreatePersonDto) {
    const personToSave = this.personModel.create({
      name:createPersonDto.name,
      rol:createPersonDto.rolId
    });
    return personToSave.then((doc)=>{
      return doc.populate(['rol']);
    });
  }

  async getAllxGrade(grade:number):Promise<Person[]>{
    const rolesWithGrade = await this.rolModel.find({ grade }).exec();
    const roleIds = rolesWithGrade.map(role => role._id);

    return this.personModel.find({rol:{$in:roleIds}}).populate('rol').exec();
  }


  // ========================================================
  private personList: Person[]=[];
  private personNames: string[]=[];
  private listMultiply: string[]=[]; 

  async shuffleProcces(grade:number){
    //Get all persons
    const persons = await this.getAllxGrade(grade);
    //Put in a new list
    this.personList = persons
    //Get only names
    this.personNames=this.personList.map(person => person.name);
    //Multiply list for x
    switch (grade) {
      case 1:
        this.listMultiply= this.multiplyList(this.personNames,3);
        break;
      case 2:
        this.listMultiply= this.multiplyList(this.personNames,3);
        break;
      case 3:
        this.listMultiply= this.multiplyList(this.personNames,2);
        break;
    }
    //Shuffle ListMultiply
    this.shuffle();

    return JSON.stringify(this.listMultiply)
  }

  private multiplyList(list:string[],times:number){
    let res=[];
    list.forEach(item =>{
      for(let i=0; i<times;i++){
        res.push(item)
      }
    })
    return res;
  }

  private shuffle(): void {
    for (let i = this.listMultiply.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.listMultiply[i], this.listMultiply[j]] = [this.listMultiply[j], this.listMultiply[i]];
    }
  }
  // ========================================================

  findAll() {
    return this.personModel.find().populate(['rol']).exec();
  }

  findOne(id: string) {
    return this.personModel.findById(id).populate(['rol']).exec();
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    return this.personModel.findByIdAndUpdate(id,updatePersonDto,{new:true}).populate(['rol']).exec();
  }

  remove(id: string) {
    return this.personModel.findByIdAndDelete(id).populate(['rol']).exec();
  }
}
