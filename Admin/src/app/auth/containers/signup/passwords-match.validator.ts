import {AbstractControl} from '@angular/forms';

export function matchPasswords(control: AbstractControl) {
  const {value} = control;
  if(value.password  !== value.confirmPassword) {
    return {
      notMatch: true
    }
  }
}
