import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadProductDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly price: string;


    @Expose()
    @IsString()
    readonly status: string;


}