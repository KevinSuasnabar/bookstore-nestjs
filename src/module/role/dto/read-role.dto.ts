import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadRoleDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()//muestra la propiedad al exterior
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly description: string;

}