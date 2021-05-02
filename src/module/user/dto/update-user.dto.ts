import { IsString } from "class-validator";

export class UpdateUserDto{

    @IsString()
    readonly username:string;
    @IsString()
    readonly name:string;
    @IsString()
    readonly lastname:string;

}