import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({example: 'root', description: 'The Root User ID'})
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty({example: 'example-pw', description: 'The Root User Password'})
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}