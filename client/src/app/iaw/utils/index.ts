import { environment } from '../../../environments/environment';
import { MsalConfig } from '@azure/msal-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Dictionary } from '@ngrx/entity';

/**
 * dynamically get Msal configs base on login request and application url
 */
export function getMsalConfigs(): MsalConfig {
  const loginReqUrl =
    localStorage.getItem('msal.login.request') ||
    sessionStorage.getItem('msal.login.request');
  const idToken =
    localStorage.getItem('msal.idtoken') ||
    sessionStorage.getItem('msal.idtoken');
  let isApplicant = true;
  if (loginReqUrl && idToken) {
    isApplicant = !loginReqUrl.includes('/agent');
  } else {
    isApplicant = !window.location.pathname.includes('/agent');
  }
  return isApplicant
    ? environment.msalApplicantConfigs
    : environment.msalAgentConfigs;
}

/**
 * @param campusCode
 * convert campus code to campus name
 * @return campusName
 */
export function campusNameConverter(campusCode: string) {
  switch (campusCode) {
    case 'NH':
      return 'Newnham';
    case 'SY':
      return 'Seneca@York';
    case 'MK':
      return 'Markham';
    case 'YG':
      return 'Peterborough';
    case 'KG':
      return 'King';
  }
}

export function campusCodeConverter(campusName: string) {
  switch (campusName) {
    case 'Newnham':
      return 'NH';
    case 'Seneca@York':
      return 'SY';
    case 'Markham':
      return 'MK';
    case 'Peterborough':
      return 'YG';
    case 'King':
      return 'KG';
  }
}

export function isAnyPropEmpty(object: Object): boolean {
  for (const key in object) {
    if (object[key] === null || object[key] === '') return true;
  }
  return false;
}

export function markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
}

export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
}
