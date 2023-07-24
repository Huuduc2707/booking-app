import {
  IsString,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayLengthValidator } from '../../utility';

class seatType {
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(40)
  quantity: number;

  event?: string;
}

export default class EventInfo {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  // @IsImage({ message: 'Invalid image file' })
  @IsString()
  readonly image: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => seatType)
  readonly seatType: seatType[];

  @IsArray()
  @ArrayNotEmpty()
  @Validate(ArrayLengthValidator, [1, 2])
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly category: string[];
}
