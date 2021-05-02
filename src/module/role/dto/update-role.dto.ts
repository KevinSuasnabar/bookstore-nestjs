import { IsString, MaxLength } from "class-validator";

export class UpdateRoleDto {

    @IsString()
    @MaxLength(50, { message: "Este nombre de rol no es valido" })
    readonly name: string;

    @IsString()
    @MaxLength(100, { message: "Esta descripcion de rol no es valido" })
    readonly description: string;

}