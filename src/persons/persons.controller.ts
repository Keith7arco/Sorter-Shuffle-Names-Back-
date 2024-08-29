import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    if(queryParams.grade){
      return this.personsService.getAllxGrade(queryParams.grade)
    }else if(queryParams.order){
      return this.personsService.shuffleProcces(queryParams.order)
    }
    return this.personsService.findAll();
  }

  @Get('shuffle/:grade')
  shuffleProcces(@Param('grade') grade:string){
    return this.personsService.shuffleProcces(+grade)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(id);
  }
}
