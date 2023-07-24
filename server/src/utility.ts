import { v2 as cloudinary } from 'cloudinary';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

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
