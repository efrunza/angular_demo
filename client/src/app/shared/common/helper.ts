import { FormControl, Validators } from '@angular/forms';
import {
  senecaOnlyLetters,
  telephoneNumberValidator,
  senecaIsNum
} from '../services/form-validation.service';
import { PhoneNumber } from '../../iaw/models';

export class Helper {
  public static CreateRequiredFormControl(): FormControl {
    return new FormControl(null, Validators.required);
  }

  public static CreateSimpleFormControl(): FormControl {
    return new FormControl(null);
  }

  public static CreateBooleanProperty(value: boolean): boolean[] {
    return [value];
  }

  public static CreateSenecaOnlyLettersControl(value: number) {
    return [null, senecaOnlyLetters(value)];
  }

  public static CreateRequiredSenecaOnlyLettersControl(value: number) {
    return [null, [Validators.required, senecaOnlyLetters(value)]];
  }

  public static CreatePhoneNumbersControl(value: number) {
    return [new PhoneNumber('', ''), telephoneNumberValidator(value)];
  }

  public static CreateRequiredEmailControl() {
    return [null, [Validators.required, Validators.email]];
  }

  public static CreateNumberInRange() {
    return [
      null,
      [Validators.maxLength(9), Validators.minLength(8), senecaIsNum]
    ];
  }
}
