import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({example: 'user1', description: 'User ID'})
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty({example: 'example-pw-1', description: 'User Password'})
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({example: 'type1', description: 'User Authorization Type'})
    @IsString()
    @IsNotEmpty()
    readonly authType: string;
}