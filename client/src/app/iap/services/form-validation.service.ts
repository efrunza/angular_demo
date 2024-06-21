import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {}

  // To do scroll to function
  // Get the correct error message for mat-hints based on the failed validator
  getErrorMessage(control: FormControl) {
    if (control) {
      if (control.hasError('required')) {
        return 'You must enter a value';
      } else if (control.hasError('email')) {
        return 'Not a valid email';
      } else if (control.hasError('notNum')) {
        return 'Student number must be a number';
      } else if (control.hasError('onlyLetters0')) {
        return 'Field can only contain letters, no special characters, numbers or spaces';
      } else if (control.hasError('onlyLetters1')) {
        return 'No special characters';
      } else if (control.hasError('onlyLetters2')) {
        return 'No numbers or special characters';
      } else if (control.hasError('maxlength')) {
        return (
          'Maximum length is ' +
          control.errors['maxlength']['requiredLength'] +
          ' characters'
        );
      } else if (control.hasError('minlength')) {
        return (
          'Minimum length is ' +
          control.errors['minlength']['requiredLength'] +
          ' characters'
        );
      } else if (control.hasError('intTelephoneNumberIsRequired')) {
        return 'Please enter a valid phone number';
      } else if (control.hasError('intNoLetters')) {
        return 'Phone number cannot contain letters or special characters';
      } else if (control.hasError('intTelLength')) {
        return 'Phone number is too long';
      } else if (control.hasError('intCountryCodeLength')) {
        return 'Country Code is required';
      } else if (control.hasError('intNumberLength')) {
        return 'Phone number is too short';
      }
      // else {
      return '';
      // }
    }
  }
}

// checks if value is a number
export function senecaIsNum(control: AbstractControl) {
  if (control.value) {
    if (!isNaN(parseFloat(control.value)) && !isFinite(control.value)) {
      return { notNum: true }; // validation failed
    }
    return null; // Validation passed
  }
}

//   /[0-9]+/.test(value); will return true if value contains a number

export function senecaNoNums(control: AbstractControl) {
  if (control.value) {
    if (/[0-9]+/.test(control.value)) {
      //checks for numbers
      return { notLet: true }; // validation failed
    }
    return null; // Validation passed
  }
}

// just letters // optional parameters to allow space and numbers -- 0 for letters only / 1 for letter numbers and spaces / 2 for letters and spaces
export function senecaOnlyLetters(options: Number = 0) {
  // if no value passed in defaults to 0 letters only
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value) {
      if (options === 0) {
        if (!/^[a-zA-z]+$/.test(control.value)) {
          //checks for letters
          return { onlyLetters0: true }; // validation failed
        }
      } else if (options === 1) {
        if (!/^[a-zA-z0-9\s]+$/.test(control.value)) {
          //checks for letters, numbers, space
          return { onlyLetters1: true }; // validation failed
        }
      } else if (options === 2) {
        if (!/^[a-zA-z\-\s]+$/.test(control.value)) {
          //checks for letters and spaces
          return { onlyLetters2: true }; // validation failed
        }
      }
      return null; // Validation passed
    }
  };
}

// TODO: control is invalid but error is now shown in html

//option 0 required + validation ---- Option 1 not required to be filled plus validation
export const telephoneNumberValidator = (options: Number) => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control && control.value) {
      if (Object.values(control.value).find(controlValue => !!controlValue)) {
        const { countryCode, number } = control.value;
        if (countryCode != null && number != null) {
          if (options === 0) {
            if (countryCode.length + number.length > 0) {
              if (isNaN(countryCode) || isNaN(number)) {
                return { intNoLetters: true };
              } else if (countryCode.length + number.length > 20) {
                return { intTelLength: true };
              } else if (countryCode.length === 0 || countryCode.length > 3) {
                return { intCountryCodeLength: true };
              } else if (number.length + number.length < 7) {
                return { intNumberLength: true };
              } else return null;
            } else {
              //outer if's else checking  if form is filled
              return { intTelephoneNumberIsRequired: true };
            }
          } // end of option 0 required logic
          else if (options === 1) {
            if (isNaN(countryCode) || isNaN(number)) {
              return { intNoLetters: true };
            } else if (countryCode.length + number.length > 20) {
              return { intTelLength: true };
            } else if (
              (countryCode.length === 0 && number.length !== 0) ||
              countryCode.length > 3
            ) {
              return { intCountryCodeLength: true };
            } else if (
              number.length + countryCode.length < 7 &&
              number.length + countryCode.length > 0
            ) {
              return { intNumberLength: true };
            } else return null;
          }
          return null;
        }
      }
    }
  };
};
