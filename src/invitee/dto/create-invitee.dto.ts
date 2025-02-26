import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteeDto {
  @ApiProperty({example: 'wltn16', description: 'ID or Name for Invitee'})
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({example: 'hongik2025', description: 'Password for Invitee'})
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({example: 'invitee', description: 'Authority for Invitee'})
  @IsString()
  @IsNotEmpty()
  readonly authType: string;

  @ApiProperty({example: 'uuid4', description: 'Unique UUID4 string for Invitee'})
  @IsString()
  @IsNotEmpty()
  readonly pageId: string; // random UUID
}
