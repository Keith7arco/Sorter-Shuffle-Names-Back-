import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name:string

  @IsInt()
  grade:number | null
}
