import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';
import { IsNameValidator } from '../../utility';

export default class BookingInfo {
  readonly id?: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsNameValidator)
  readonly fullName;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN')
  readonly phoneNumber;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email;

  @IsNotEmpty()
  @IsNumber()
  readonly totalPayment;

  @IsNotEmpty()
  @IsString()
  readonly event: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly seats: string[];
}
