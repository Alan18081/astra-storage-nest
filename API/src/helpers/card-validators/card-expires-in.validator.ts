import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import * as cardValidator from 'card-validator';

export class CardExpiresInValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const { isValid } = cardValidator.expiresIn(value);
    return isValid;
  }
}