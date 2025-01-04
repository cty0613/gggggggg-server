import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly authType: string;

  @IsString()
  @IsNotEmpty()
  readonly pageId: string; // random UUID
}
