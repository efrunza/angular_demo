import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { academicSelectors, countryListSelectors, infoReleaseSelectors } from 'app/store/selectors';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DisplayErrorMessage, LoadCountryList, LoadInfoRelease, SubmitInfoRelease } from 'app/store/actions';
import { AppSubmitError, InfoRelease, PhoneNumber } from 'shared/models';
import { FormValidationService, senecaOnlyLetters, telephoneNumberValidator } from 'app/shared/services/form-validation.service';
import { validateAllFormFields } from 'app/utils';
/**
 * Info Release Component, main component for info release data
 */
var InfoReleaseComponent = /** @class */ (function () {
    function InfoReleaseComponent(cdr, formBuilder, store, formValidationService) {
        this.cdr = cdr;
        this.formBuilder = formBuilder;
        this.store = store;
        this.formValidationService = formValidationService;
        this.destroyed$ = new Subject();
        this.infoReleaseData = null;
        this.loading = true;
        this.provinceList = [];
        /**
         * pre-defined list of titles
         */
        this.titleList = [
            { name: 'Mr', value: 'Mr' },
            { name: 'Miss', value: 'Miss' },
            { name: 'Ms', value: 'Ms' },
            { name: 'Mrs', value: 'Mrs' }
        ];
        /**
         * pre-defined list of relations
         */
        this.relationList = [
            { name: 'Father', value: 'father' },
            { name: 'Mother', value: 'mother' },
            { name: 'Sister', value: 'sister' },
            { name: 'Brother', value: 'brother' },
            { name: 'Spouse', value: 'spouse' },
            { name: 'Friend', value: 'friend' },
            { name: 'Other Relative', value: 'other' }
        ];
    }
    InfoReleaseComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new LoadInfoRelease());
        this.store.dispatch(new LoadCountryList());
        // create form structure
        this.createForm();
        this.handleAuthFlagChanges();
        // get the error and display message accordingly
        this.watchErrors();
        // get the data and loading for the store and do some actions
        this.fetchFormData();
    };
    /**
     * initialize info release skeleton
     */
    InfoReleaseComponent.prototype.createForm = function () {
        this.infoReleaseForm = this.formBuilder.group({
            authFlag: [false]
        });
    };
    /**
     * listen for error and display a snackbar when error occurs
     */
    InfoReleaseComponent.prototype.watchErrors = function () {
        var _this = this;
        combineLatest(this.store.select(infoReleaseSelectors.selectError), this.store.select(countryListSelectors.selectError))
            .pipe(map(function (_a) {
            var infoReleaseErr = _a[0], countriesErr = _a[1];
            if (infoReleaseErr) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: infoReleaseErr,
                    callback: function () { return _this.store.dispatch(new LoadInfoRelease()); }
                }));
            }
            else if (countriesErr) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: countriesErr,
                    callback: function () { return _this.store.dispatch(new LoadCountryList()); }
                }));
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
    };
    /**
     * load info release data, country list and loading state, put data into the form if exist
     */
    InfoReleaseComponent.prototype.fetchFormData = function () {
        var _this = this;
        combineLatest(this.store.select(infoReleaseSelectors.selectLoading), this.store.select(infoReleaseSelectors.selectInfoReleaseData), this.store.select(countryListSelectors.selectAll))
            .pipe(map(function (_a) {
            var loading = _a[0], data = _a[1], countries = _a[2];
            _this.loading = loading;
            if (countries && countries.length > 0) {
                _this.countryList = countries;
            }
            if (!loading) {
                _this.infoReleaseData = data;
                if (data && data.info) {
                    // turn on the flag when there is data, the info FormControl is created when this flag is true
                    _this.infoReleaseForm.patchValue({
                        authFlag: true,
                        info: data.info
                    });
                }
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
    };
    /**
     * get the list of provinces form the address
     * @param addressType address
     */
    InfoReleaseComponent.prototype.getProvinceList = function (addressType) {
        var selectedCountry = addressType.get('country');
        if (this.countryList) {
            var countryByCode = this.countryList.find(function (country) { return country.code === selectedCountry.value; });
            if (countryByCode && countryByCode.provinceList) {
                this.provinceList = countryByCode.provinceList;
            }
            else {
                this.provinceList = [];
            }
        }
    };
    /**
     * event fires whenever authFlag changes, remove or add Info FormControl dynamically
     */
    InfoReleaseComponent.prototype.handleAuthFlagChanges = function () {
        var _this = this;
        this.authFlag.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function () {
            // dynamically add or remove InfoFormControl based on authFlag value
            if (_this.authFlag.value) {
                _this.addInfoFormControl();
            }
            else {
                _this.removeInfoFormControl();
            }
            if (_this.infoReleaseForm.get('authFlag').value === true) {
                var releaseAddress_1 = _this.infoReleaseForm.get('info');
                var selectedCountry = releaseAddress_1.get('country');
                if (selectedCountry.value) {
                    _this.getProvinceList(releaseAddress_1);
                }
                else {
                    // change list of province whenever country value changes
                    selectedCountry.valueChanges
                        .pipe(takeUntil(_this.destroyed$))
                        .subscribe(function () {
                        _this.getProvinceList(releaseAddress_1);
                    });
                }
            }
            _this.cdr.detectChanges();
        });
    };
    /**
     * add info FormControl to the parent form
     */
    InfoReleaseComponent.prototype.addInfoFormControl = function () {
        this.infoReleaseForm.addControl('info', this.createInfoFormControl());
    };
    /**
     * remove info FormControl to the parent form
     */
    InfoReleaseComponent.prototype.removeInfoFormControl = function () {
        this.infoReleaseForm.removeControl('info');
    };
    /**
     *  adding a nested form group inside the main form group to hold the release information
     */
    InfoReleaseComponent.prototype.createInfoFormControl = function () {
        return this.formBuilder.group({
            relationship: [null, Validators.required],
            title: [null, Validators.required],
            firstName: [null, senecaOnlyLetters(2)],
            lastName: [null, [Validators.required, senecaOnlyLetters(2)]],
            address: [null, [Validators.required, senecaOnlyLetters(1)]],
            address2: [null, senecaOnlyLetters(1)],
            city: [null, [Validators.required, senecaOnlyLetters(2)]],
            state: [null],
            zipCode: [null, [Validators.required, senecaOnlyLetters(1)]],
            country: [null, Validators.required],
            phone: [new PhoneNumber('', ''), telephoneNumberValidator(0)],
            cellPhone: [new PhoneNumber('', ''), telephoneNumberValidator(1)],
            email: [null, [Validators.required, Validators.email]]
        });
    };
    Object.defineProperty(InfoReleaseComponent.prototype, "infoFormControl", {
        get: function () {
            return this.infoReleaseForm.get('info');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoReleaseComponent.prototype, "authFlag", {
        get: function () {
            return this.infoReleaseForm.get('authFlag');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * handle save button event
     * @param event button event
     */
    InfoReleaseComponent.prototype.onSaveClick = function (event) {
        event.preventDefault();
        if (this.infoReleaseForm.valid) {
            this.saving$ = this.store.select(academicSelectors.selectSaving);
            var info = this.infoReleaseForm.value.info;
            var newInfoRelease = new InfoRelease(this.infoReleaseData.id, info);
            this.store.dispatch(new SubmitInfoRelease(newInfoRelease));
        }
        else {
            validateAllFormFields(this.infoReleaseForm);
            var error = new AppSubmitError(null, 'Your data is invalid, please go back and fix the errors');
            this.store.dispatch(new DisplayErrorMessage({ error: error }));
        }
    };
    InfoReleaseComponent.prototype.fillDefaultZipCode = function () {
        this.infoReleaseForm
            .get('info')
            .get('zipCode')
            .setValue('00000');
    };
    InfoReleaseComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    InfoReleaseComponent = tslib_1.__decorate([
        Component({
            selector: 'app-info-release',
            templateUrl: './info-release.component.html',
            styleUrls: ['./info-release.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            FormBuilder,
            Store,
            FormValidationService])
    ], InfoReleaseComponent);
    return InfoReleaseComponent;
}());
export { InfoReleaseComponent };
//# sourceMappingURL=info-release.component.js.map