import { IsNotEmpty, IsString } from 'class-validator';

export class OrderIdParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
