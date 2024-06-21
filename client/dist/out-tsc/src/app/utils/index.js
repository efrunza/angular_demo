import { environment } from '../../environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
/**
 * dynamically get Msal configs base on login request and application url
 */
export function getMsalConfigs() {
    var loginReqUrl = localStorage.getItem('msal.login.request') ||
        sessionStorage.getItem('msal.login.request');
    var idToken = localStorage.getItem('msal.idtoken') ||
        sessionStorage.getItem('msal.idtoken');
    var isApplicant = true;
    if (loginReqUrl && idToken) {
        isApplicant = !loginReqUrl.includes('/agent');
    }
    else {
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
export function campusNameConverter(campusCode) {
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
export function campusCodeConverter(campusName) {
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
export function isAnyPropEmpty(object) {
    for (var key in object) {
        if (object[key] === null || object[key] === '')
            return true;
    }
    return false;
}
export function markFormGroupTouched(formGroup) {
    Object.values(formGroup.controls).forEach(function (control) {
        control.markAsTouched();
        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
}
export function validateAllFormFields(formGroup) {
    Object.keys(formGroup.controls).forEach(function (field) {
        var control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        }
        else if (control instanceof FormGroup) {
            validateAllFormFields(control);
        }
    });
}
//# sourceMappingURL=index.js.map