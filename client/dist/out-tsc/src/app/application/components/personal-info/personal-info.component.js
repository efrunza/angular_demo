import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppSubmitError, EErrorType, EUserType, PhoneNumber } from 'app/shared/models';
import { DisplayErrorMessage, LoadCountryList, LoadLanguageList, LoadPersonalInfo, SubmitPersonalInfo } from 'app/store/actions';
import { countryListSelectors, languageListSelectors, personalInfoSelectors } from 'app/store/selectors';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'app/app.service';
import { FormValidationService, senecaIsNum, senecaOnlyLetters, telephoneNumberValidator } from 'app/shared/services/form-validation.service';
import { AuthService } from 'app/auth/auth.service';
import { commonEnv } from 'environments/environment.common';
/**
 * Personal Info Component, main component for personal info data
 */
var PersonalInfoComponent = /** @class */ (function () {
    // passing an instance of FormBuilder (fb) to the constructor
    function PersonalInfoComponent(formBuilder, store, cdr, appService, formValidationService, authService) {
        this.formBuilder = formBuilder;
        this.store = store;
        this.cdr = cdr;
        this.appService = appService;
        this.formValidationService = formValidationService;
        this.authService = authService;
        this.userTypeEnum = EUserType;
        /**
         * holding personal info form data and status
         */
        this.personalInfo = {
            data: null,
            loading: false,
            error: null,
            saving: false
        };
        /**
         * holding languages data and status
         */
        this.languageList = null;
        /**
         * holding countries data and status
         */
        this.countryList = null;
        /**
         * holding states data and status
         */
        this.permanentProvinceList = [];
        this.mailingProvinceList = [];
        /**
         *  let observable know when to unsubscribe, will be marked as completed whenever the form is destroyed
         */
        this.destroyed$ = new Subject();
        this.maxDate = new Date();
        this.setUserInfo();
    }
    /**
     * depend on the policy to set userType
     */
    PersonalInfoComponent.prototype.setUserInfo = function () {
        this.userType =
            this.authService.getUserInfo().tfp === commonEnv.applicantSignInPolicy
                ? EUserType.Applicant
                : EUserType.Agent;
    };
    PersonalInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(new LoadPersonalInfo());
        // setting the loading state of the form to true
        this.personalInfo.loading = true;
        // creates a form group for the personal information form
        this.createFormGroup();
        // gets the province list for the selected countries in the from
        var permanentAddress = this.personalInfoForm.get('permanentAddress');
        var mailingAddress = this.personalInfoForm.get('mailingAddress');
        var selectedPermanetCountry = this.personalInfoForm
            .get('permanentAddress')
            .get('country');
        var selectedMailingCountry = this.personalInfoForm
            .get('mailingAddress')
            .get('country');
        selectedPermanetCountry.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function () {
            _this.getProvinceList(permanentAddress);
        });
        selectedMailingCountry.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function () {
            _this.getProvinceList(mailingAddress);
        });
        // detect flag changes in the form and dynamically update form validators based on the changes
        this.detectFlagChanges();
    };
    PersonalInfoComponent.prototype.ngAfterViewInit = function () {
        // selects the data and error state of personal info form from the store
        this.getFormState();
    };
    /**
     * clearing unused form fields
     * @param form FormGroup to clear
     */
    PersonalInfoComponent.prototype.clearFields = function (form) {
        if (form.get('isPreviousStudent').value === false) {
            form.get('previousStudentID').setErrors(null);
            form.get('previousStudentID').clearValidators();
            form.get('previousStudentID').updateValueAndValidity();
        }
        if (form.get('currAddrSameAsPerm').value === true) {
            var mailingAddress_1 = form.get('mailingAddress');
            Object.keys(mailingAddress_1.controls).forEach(function (key) {
                var control = mailingAddress_1.get(key);
                control.setErrors(null);
                control.clearValidators();
                control.updateValueAndValidity();
            });
        }
    };
    /**
     * creates the personalInfoForm form group for the html template
     */
    PersonalInfoComponent.prototype.createFormGroup = function () {
        // personal information form group
        this.personalInfoForm = this.formBuilder.group({
            appId: [null],
            isPreviousStudent: [false],
            previousStudentID: [
                null,
                [Validators.maxLength(9), Validators.minLength(8), senecaIsNum]
            ],
            title: [null, Validators.required],
            surName: [null, [Validators.required, senecaOnlyLetters(2)]],
            firstName: [null, [senecaOnlyLetters(2)]],
            otherNames: [null],
            gender: [null, Validators.required],
            dob: [null, Validators.required],
            countryOB: [null, Validators.required],
            countryOC: [null, Validators.required],
            countryOA: [null, Validators.required],
            primaryLang: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            // permanent address form group nested within the personal info form group
            permanentAddress: this.formBuilder.group({
                country: [null, Validators.required],
                province: [null],
                city: [null, [Validators.required, senecaOnlyLetters(2)]],
                stAddress: [null, [Validators.required, senecaOnlyLetters(1)]],
                stAddress2: [null, senecaOnlyLetters(1)],
                zipCode: [null, [Validators.required, senecaOnlyLetters(1)]],
                phone: [new PhoneNumber('', ''), telephoneNumberValidator(0)],
                cell: [new PhoneNumber('', ''), telephoneNumberValidator(1)]
            }),
            currAddrSameAsPerm: [false],
            // mailing address form group nested within the personal info form group
            mailingAddress: this.formBuilder.group({
                country: [null],
                province: [null],
                city: [null, senecaOnlyLetters(2)],
                stAddress: [null, senecaOnlyLetters(1)],
                stAddress2: [null, senecaOnlyLetters(1)],
                zipCode: [null, senecaOnlyLetters(1)]
            }, {
                validator: this.requiredIf(this.personalInfoForm, 'currAddrSameAsPerm')
            })
        }, {
            validator: this.requiredIf(this.personalInfoForm, 'isPreviousStudent')
        });
    };
    /**
     * Detect flag changes
     */
    PersonalInfoComponent.prototype.detectFlagChanges = function () {
        var _this = this;
        this.personalInfoForm.controls['currAddrSameAsPerm'].valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function () {
            _this.cdr.detectChanges();
            var subForm = _this.personalInfoForm.get('mailingAddress');
            if (_this.personalInfoForm.controls['currAddrSameAsPerm'].value === true) {
                subForm.clearValidators();
                subForm.setErrors(null);
                Object.keys(subForm.controls).forEach(function (item) {
                    subForm.controls[item].setErrors(null);
                });
            }
            subForm.updateValueAndValidity();
        });
        this.personalInfoForm.controls['isPreviousStudent'].valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function () {
            _this.cdr.detectChanges();
            var dependantControl = _this.personalInfoForm.get('previousStudentID');
            if (_this.personalInfoForm.controls['isPreviousStudent'].value === false) {
                dependantControl.clearValidators();
                dependantControl.setErrors(null);
            }
            dependantControl.updateValueAndValidity();
        });
    };
    /**
     * custom validator that takes a formGroup and a string representing a formControlName
     * sets the formControls inside that formGroup to required IF the passed formControlName to the function has a value
     * @param form FormGroup to set
     * @param fieldName name of field
     */
    PersonalInfoComponent.prototype.requiredIf = function (form, fieldName) {
        if (form &&
            form.controls &&
            form.controls[fieldName] &&
            (form.controls[fieldName].value === null ||
                form.controls[fieldName].value === false)) {
            return { required: true };
        }
        else
            return null;
    };
    /**
     * get list of provinces from the address
     * @param addressType address
     */
    PersonalInfoComponent.prototype.getProvinceList = function (addressType) {
        var selectedCountry = addressType.get('country');
        if (this.countryList) {
            var countryByCode = this.countryList.find(function (country) { return country.code === selectedCountry.value; });
            if (addressType === this.personalInfoForm.get('permanentAddress')) {
                if (countryByCode && countryByCode.provinceList) {
                    this.permanentProvinceList = countryByCode.provinceList;
                }
                else {
                    this.permanentProvinceList = [];
                }
            }
            else if (addressType === this.personalInfoForm.get('mailingAddress')) {
                if (countryByCode && countryByCode.provinceList) {
                    this.mailingProvinceList = countryByCode.provinceList;
                }
                else {
                    this.mailingProvinceList = [];
                }
            }
        }
    };
    /**
     * select the data state of store
     */
    PersonalInfoComponent.prototype.getFormState = function () {
        var _this = this;
        combineLatest(this.store.select(personalInfoSelectors.selectFormatted), this.store.select(languageListSelectors.selectAll), this.store.select(countryListSelectors.selectAll), this.store.select(personalInfoSelectors.selectError), this.store.select(languageListSelectors.selectError), this.store.select(countryListSelectors.selectError))
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function (_a) {
            var personalInfoData = _a[0], languageListData = _a[1], countryListData = _a[2], personalInfoErrors = _a[3], languageListErrors = _a[4], countryListErrors = _a[5];
            // check if the subscription is returning data and populates the form
            if (personalInfoData &&
                languageListData &&
                languageListData.length &&
                countryListData &&
                countryListData.length &&
                !personalInfoErrors &&
                !languageListErrors &&
                !countryListErrors) {
                _this.languageList = languageListData;
                _this.countryList = countryListData;
                _this.personalInfoForm.patchValue(personalInfoData);
                _this.personalInfoForm.enable();
                // set the applicant email based on their login info and disable the field
                if (_this.appService.applicantEmail) {
                    _this.personalInfoForm
                        .get('email')
                        .setValue(_this.appService.applicantEmail);
                    // setting the field to readonly in the html
                }
                setTimeout(function () {
                    _this.personalInfo = {
                        data: personalInfoData,
                        loading: false,
                        error: false,
                        saving: false
                    };
                });
            }
            // If there are no errors in the store, ensure it is not empty, else show errors
            if (personalInfoErrors || languageListErrors || countryListErrors) {
                if ((personalInfoErrors &&
                    personalInfoErrors.type === EErrorType.LOAD) ||
                    (languageListErrors &&
                        languageListErrors.type === EErrorType.LOAD) ||
                    (countryListErrors && countryListErrors.type === EErrorType.LOAD)) {
                    _this.personalInfoForm.disable();
                }
                _this.personalInfo.loading = false;
                _this.personalInfo.error = true;
                _this.showErrors([
                    personalInfoErrors,
                    languageListErrors,
                    countryListErrors
                ]);
            }
            else {
                if (!countryListData || !countryListData.length) {
                    _this.store.dispatch(new LoadCountryList());
                    _this.personalInfo.loading = true;
                }
                else if (!languageListData || !languageListData.length) {
                    _this.store.dispatch(new LoadLanguageList());
                    _this.personalInfo.loading = true;
                }
            }
        });
    };
    /**
     * show a snackbar error according to type of error
     * @param personalInfoErrors personal info error object
     * @param languageListErrors language error object
     * @param countryListErrors country list error object
     */
    PersonalInfoComponent.prototype.showErrors = function (_a) {
        var _this = this;
        var personalInfoErrors = _a[0], languageListErrors = _a[1], countryListErrors = _a[2];
        // In case any essential data is missing, show an error with the appropriate action
        if (personalInfoErrors) {
            var personalInfoCallBack = null;
            if (personalInfoErrors.type === EErrorType.LOAD) {
                personalInfoCallBack = function () {
                    _this.store.dispatch(new LoadPersonalInfo());
                    _this.personalInfo.loading = true;
                };
            }
            this.store.dispatch(new DisplayErrorMessage({
                error: personalInfoErrors,
                callback: personalInfoCallBack
            }));
        }
        else if (languageListErrors) {
            var languageListCallBack = null;
            if (languageListErrors.type === EErrorType.LOAD) {
                languageListCallBack = function () {
                    _this.store.dispatch(new LoadLanguageList());
                    _this.personalInfo.loading = true;
                };
            }
            this.store.dispatch(new DisplayErrorMessage({
                error: languageListErrors,
                callback: languageListCallBack
            }));
        }
        else if (countryListErrors) {
            var countryListCallBack = null;
            if (countryListErrors.type === EErrorType.LOAD) {
                countryListCallBack = function () {
                    _this.store.dispatch(new LoadCountryList());
                    _this.personalInfo.loading = true;
                };
            }
            this.store.dispatch(new DisplayErrorMessage({
                error: countryListErrors,
                callback: countryListCallBack
            }));
        }
    };
    /**
     * save button event
     * @param event button event
     */
    PersonalInfoComponent.prototype.onSaveClick = function (event) {
        // prevent page refresh onSubmit action
        event.preventDefault();
        // Clearing unused form fields
        this.clearFields(this.personalInfoForm);
        if (this.personalInfoForm.valid) {
            // Saving the status of the form after submission
            this.saving$ = this.store.select(personalInfoSelectors.selectSaving);
            // Dispatch the SubmitPersonalInfo action and 'POST' the form to the API
            this.store.dispatch(new SubmitPersonalInfo(this.personalInfoForm.value));
            // NOTE: Page navigation is being handled by shared.models.ts
        }
        else {
            var error = new AppSubmitError(null, 'Your data is invalid, please go back and fix the errors');
            this.store.dispatch(new DisplayErrorMessage({ error: error }));
        }
    };
    /**
     * fill the zipCode field in case somebody does not have zipCode in there country
     */
    PersonalInfoComponent.prototype.fillDefaultZipCode = function () {
        this.personalInfoForm
            .get('permanentAddress')
            .get('zipCode')
            .setValue('00000');
    };
    PersonalInfoComponent.prototype.ngOnDestroy = function () {
        this.cdr.detach();
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    PersonalInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-personal-info',
            templateUrl: './personal-info.component.html',
            styleUrls: ['./personal-info.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Store,
            ChangeDetectorRef,
            AppService,
            FormValidationService,
            AuthService])
    ], PersonalInfoComponent);
    return PersonalInfoComponent;
}());
export { PersonalInfoComponent };
//# sourceMappingURL=personal-info.component.js.map