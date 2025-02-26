import { IsNotEmpty, IsString } from "class-validator";

export class bookPageMetaDto {
    @IsString()
    @IsNotEmpty()
    readonly bookNum: string;

    @IsString()
    @IsNotEmpty()
    readonly seq: string;
}