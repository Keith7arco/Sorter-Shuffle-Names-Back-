import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsMongoId()
  rolId:string;
}
