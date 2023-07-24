import {
  IsString,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  Max,
} from 'class-validator';

class seatType {
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(40)
  quantity: number;

  @IsNotEmpty()
  @IsString()
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
  @ValidateNested()
  readonly seatType: seatType[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly category: string[];
}
