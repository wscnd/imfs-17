import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: Array<OrderItemDto>;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  card_hash: string;
}

export class OrderItemDto {
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  @MinLength(36)
  product_id: string;
}
