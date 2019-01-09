import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import * as cardValidator from 'card-validator';

export class CardCvvValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const { isValid } = cardValidator.cvv(value);
    return isValid;
  }
}