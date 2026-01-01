import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsTrueConstraint', async: false })
export class IsTrueConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: boolean, _?: ValidationArguments): boolean {
    return value;
  }

  defaultMessage() {
    return 'Must agree to Terms';
  }
}

export function IsTrue() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: IsTrueConstraint,
    });
  };
}
