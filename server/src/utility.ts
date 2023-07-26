import { v2 as cloudinary } from 'cloudinary';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as nodemailer from 'nodemailer';
import BookingInfo from './modules/booking/booking.dto';

cloudinary.config({
  cloud_name: 'deoifwvax',
  api_key: '996692159189324',
  api_secret: '6Q0rVEI-7eNwQGnqytlJHGKHmLw',
});

export function IdGenerator(type: string): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = type;
  const charactersLength = characters.length;
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}

@ValidatorConstraint({ name: 'arrayLength', async: false })
export class ArrayLengthValidator implements ValidatorConstraintInterface {
  validate(array: any[], args: ValidationArguments) {
    const minLength = args.constraints[0];
    const maxLength = args.constraints[1];
    return array.length >= minLength && array.length <= maxLength;
  }
  defaultMessage(args: ValidationArguments) {
    const minLength = args.constraints[0];
    const maxLength = args.constraints[1];
    return `The array length must be between ${minLength} and ${maxLength}.`;
  }
}

@ValidatorConstraint({ name: 'isName', async: false })
export class IsNameValidator implements ValidatorConstraintInterface {
  validate(name: string) {
    const regex =
      /^([a-zA-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+\s?)+$/;
    return regex.test(name);
  }
  defaultMessage() {
    return `Not a valid name`;
  }
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'huuduc2707@gmail.com',
        pass: 'eibjehcgngyzcobt',
      },
    });
  }

  async sendEmail(bookingInfo: BookingInfo, bookingId: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'huuduc2707@gmail.com',
      to: bookingInfo.email,
      subject: 'Booking detail',
      text: `Hello from easyBooking,
      We are sending this email to inform you about your booking detail:
      Booking ID: ${bookingId},
      Customer name: ${bookingInfo.fullName},
      Phone number: ${bookingInfo.phone},
      Event ID: ${bookingInfo.event},
      Total payment: ${bookingInfo.totalPayment},
      ${bookingInfo.seats.length > 1 ? 'Seats: ' : 'Seat: '}${
        bookingInfo.seats
      }`,
    });
  }
}
