import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({example: '777', description: 'Book Number'})
    @IsString()
    @IsNotEmpty()
    readonly bookNum: string;

    @ApiProperty({description: 'Tags for Book Indexing'})
    @ValidateNested()
    @Type(() => TagsDto)
    readonly tags: TagsDto

    @ApiProperty({example:'2024-03-07T15:00:00.000Z', description: 'ISO8601 Date String of Book Realease'})
    @IsDateString()
    @IsNotEmpty()
    readonly date: string;

    @ApiProperty({example: '최주혁', description: 'Book Interviewee Name'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({example: 40 , description: 'Book Page Count'})
    @IsNumber()
    @IsNotEmpty()
    readonly pageCount: number;

    @ApiProperty({example: 'https://gggggggg-statics.s3.ap-northeast-2.amazonaws.com/covers/cover_bw_???', description: 'Book Cover Image URL (Black and White)'})
    @IsString()
    @IsNotEmpty()
    readonly coverBW: string;

    @ApiProperty({example: 'https://gggggggg-statics.s3.ap-northeast-2.amazonaws.com/covers/cover_color_???', description: 'Book Cover Image URL (Color)'})
    @IsString()
    @IsNotEmpty()
    readonly coverColor: string;

    @ApiProperty({description: 'Book Pages Image URLs'})
    @IsString({ each: true })
    @IsNotEmpty()
    readonly pages: string[];

    @ApiProperty({description: 'Book Thumbnails Image URLs'})
    @IsString({ each: true })
    @IsNotEmpty()
    readonly thumbnails: string[];
}