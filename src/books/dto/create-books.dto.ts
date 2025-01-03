import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsDateString, ValidateNested } from 'class-validator';

class TagsDto {
    @IsString()
    @IsNotEmpty()
    readonly default: string;
    
    @IsString()
    @IsNotEmpty()
    readonly kor: string;
    
    @IsString()
    @IsNotEmpty()
    readonly eng: string;
      
}

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    readonly bookNum: string;

    @ValidateNested()
    @Type(() => TagsDto)
    readonly tags: TagsDto

    @IsDateString()
    @IsNotEmpty()
    readonly date: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly pageCount: number;

    @IsString()
    @IsNotEmpty()
    readonly coverBW: string;

    @IsString()
    @IsNotEmpty()
    readonly coverColor: string;

    @IsString({ each: true })
    @IsNotEmpty()
    readonly pages: string[];

    @IsString({ each: true })
    @IsNotEmpty()
    readonly thumbnails: string[];
}