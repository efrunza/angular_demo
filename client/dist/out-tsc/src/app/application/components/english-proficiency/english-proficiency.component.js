import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppSubmitError, EEliOption, EnglishProficiency } from 'app/shared/models';
import { DisplayErrorMessage, LoadCountryList, LoadEnglishProficiency, LoadInfoRelease, SubmitEnglishProficiency } from 'app/store/actions';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { applicantInfoSelectors, countryListSelectors, englishProficiencySelectors } from 'app/store/selectors';
import { MediaObserver } from '@angular/flex-layout';
import { validateAllFormFields } from 'app/utils';
/**
 * English Proficiency Component, main component for english proficiency data
 */
var EnglishProficiencyComponent = /** @class */ (function () {
    function EnglishProficiencyComponent(formBuilder, store, mediaObserver) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.store = store;
        this.mediaObserver = mediaObserver;
        this.destroyed$ = new Subject();
        this.loading = true;
        this.isMobile = false;
        /**
         * pre-defined ELI option value
         *
         * used for matching radio button value to display its inputs
         */
        this.eliOptionValue = {
            submitScore: EEliOption.SUBMIT_SCORE,
            attendELI: EEliOption.ATTEND_ELI,
            attendPartnership: EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS,
            notApplicable: EEliOption.NOT_APPLICABLE
        };
        /**
         * pre-defined test names
         */
        this.testNames = ['TOEFL', 'IELTS', 'PTE'];
        /**
         * pre-defined test groups
         *
         * holding test key, name and its score values
         */
        this.testGroups = [
            {
                name: 'TOEFL',
                value: [
                    {
                        name: 'TOEFL IBT (Internet based)',
                        values: [
                            { name: '<80', value: '<80' },
                            { name: '80 to 83', value: '80-83' },
                            { name: '84 to 87', value: '84-87' },
                            { name: '88+', value: '88+' }
                        ]
                    },
                    {
                        name: 'TOEFL TFE (Paper based)',
                        values: [
                            { name: '<550', value: '<550' },
                            { name: '550 to 569', value: '550-569' },
                            { name: '570 to 579', value: '570-579' },
                            { name: '580+', value: '580+' }
                        ]
                    }
                ]
            },
            {
                name: 'IELTS',
                value: [
                    {
                        name: 'IELTS',
                        values: [
                            { name: '1 to 5.5', value: '1-5.5' },
                            { name: '6', value: '6' },
                            { name: '6.5+', value: '6.5+' }
                        ]
                    }
                ]
            },
            {
                name: 'PTE',
                value: [
                    {
                        name: 'PTE',
                        values: [
                            { name: '<58', value: '<58' },
                            { name: '58 to 59', value: '58-59' },
                            { name: '60+', value: '60+' }
                        ]
                    }
                ]
            }
        ];
        /**
         * just a place holder
         */
        this.selectedTestGroup = {
            name: null,
            value: [{ name: null, values: [{ name: null, value: null }] }]
        };
        this.maxDate = new Date();
        // set minimum date
        this.minDate = new Date(this.maxDate.getFullYear() - 2, 0, 1);
        // determine whether user is in mobile mode or not
        mediaObserver
            .asObservable()
            .pipe(tap(function (changes) {
            _this.isMobile = !!changes.find(function (change) { return change.mqAlias === 'lt-md'; });
        }), takeUntil(this.destroyed$))
            .subscribe();
    }
    EnglishProficiencyComponent.prototype.ngOnInit = function () {
        this.dispatchLoadingData();
        this.createForm();
        this.watchErrors();
        this.handleEliOptionChange();
        this.fetchFormData();
    };
    /**
     * initialize english prof form skeleton
     */
    EnglishProficiencyComponent.prototype.createForm = function () {
        this.englishProfForm = this.formBuilder.group({
            eliOption: [null, Validators.required]
        });
    };
    EnglishProficiencyComponent.prototype.dispatchLoadingData = function () {
        this.store.dispatch(new LoadEnglishProficiency());
        this.store.dispatch(new LoadCountryList());
    };
    /**
     * listen for error and display a snackbar accordingly when error occurs
     */
    EnglishProficiencyComponent.prototype.watchErrors = function () {
        var _this = this;
        combineLatest(this.store.select(englishProficiencySelectors.selectError), this.store.select(countryListSelectors.selectError))
            .pipe(map(function (_a) {
            var englishProfErr = _a[0], countriesErr = _a[1];
            if (englishProfErr) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: englishProfErr,
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
     * load englishProf, countryList and loading states, put data into the form if exist
     */
    EnglishProficiencyComponent.prototype.fetchFormData = function () {
        var _this = this;
        combineLatest(this.store.select(englishProficiencySelectors.selectLoading), this.store.select(countryListSelectors.selectLoading), this.store.select(englishProficiencySelectors.selectEnglishProfData), this.store.select(countryListSelectors.selectAll))
            .pipe(map(function (_a) {
            var loading = _a[0], countryListLoading = _a[1], data = _a[2], countries = _a[3];
            _this.loading = loading || countryListLoading;
            if (countries && countries.length > 0) {
                _this.countryList = countries;
            }
            if (!loading) {
                var eliOptionDetail = null;
                if (data) {
                    // transform data to match the form structure in order for patchValue() to work
                    switch (data.eliOption) {
                        case EEliOption.SUBMIT_SCORE:
                            eliOptionDetail = tslib_1.__assign({}, data.test);
                            break;
                        case EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS:
                            eliOptionDetail = tslib_1.__assign({}, data.partner);
                            break;
                        default:
                            eliOptionDetail = null;
                    }
                    var formatted = {
                        eliOption: data.eliOption,
                        eliOptionDetail: eliOptionDetail
                    };
                    _this.englishProfData = formatted;
                    _this.englishProfForm.patchValue(formatted);
                }
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
    };
    /**
     * create submit score FormGroup for dynamically control form value
     */
    EnglishProficiencyComponent.prototype.createSubmitScoreFormGroup = function () {
        return this.formBuilder.group({
            name: [null, Validators.required],
            score: [null, Validators.required],
            date: [null, Validators.required],
            country: [null, Validators.required]
        });
    };
    /**
     * create attend partner FormGroup for dynamically control form value
     */
    EnglishProficiencyComponent.prototype.createAttendPartnerFormGroup = function () {
        return this.formBuilder.group({
            name: [null, Validators.required],
            dateCompletion: [null, Validators.required]
        });
    };
    /**
     * depend on the eliOption, add a specific FormGroup into EnglishProf form,
     * there should be only one DetailFormControl at a time
     * @param eliOption target eli option
     *
     */
    EnglishProficiencyComponent.prototype.addEliOptionDetailFormControl = function (eliOption) {
        switch (eliOption) {
            case EEliOption.SUBMIT_SCORE:
                // NOTE: the FormControl name (eliOptionDetail) should be matched
                this.englishProfForm.addControl('eliOptionDetail', this.createSubmitScoreFormGroup());
                break;
            case EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS:
                this.englishProfForm.addControl('eliOptionDetail', this.createAttendPartnerFormGroup());
                break;
            default:
                return;
        }
    };
    /**
     * remove the detail FormControl
     */
    EnglishProficiencyComponent.prototype.removeEliOptionDetailFormControl = function () {
        this.englishProfForm.removeControl('eliOptionDetail');
    };
    /**
     * fire whenever an eliOption changes, dynamically add or remove detail FormControl accordingly
     */
    EnglishProficiencyComponent.prototype.handleEliOptionChange = function () {
        var _this = this;
        this.eliOptionFormControl.valueChanges
            .pipe(
        // prevent observable continuously trigger event
        distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe(function () {
            // if detail FormControl already existed, remove the old one and then add the new one
            if (_this.eliOptionFormControl.value) {
                if (_this.eliOptionDetailFormControl) {
                    _this.removeEliOptionDetailFormControl();
                }
                _this.addEliOptionDetailFormControl(_this.eliOptionFormControl.value);
                // patch new value inside the new added FormControl
                // NOTE: patchValue() function does not work here, will cause infinite loop
                if (_this.eliOptionFormControl.value ===
                    _this.englishProfData.eliOption &&
                    _this.englishProfData.eliOptionDetail) {
                    _this.eliOptionFormControl.setValue(_this.englishProfData.eliOption);
                    _this.eliOptionDetailFormControl.setValue(_this.englishProfData.eliOptionDetail);
                }
                // dynamically add a HTML select to select score base on selected test
                if (_this.eliOptionFormControl.value === _this.eliOptionValue.submitScore) {
                    _this.eliOptionDetailFormControl
                        .get('name')
                        .valueChanges.pipe(takeUntil(_this.destroyed$))
                        .subscribe(function () {
                        // get the user input test name and find it in the pre-defined test name array
                        var testName = _this.eliOptionDetailFormControl.get('name')
                            .value;
                        if (testName)
                            _this.selectedTestGroup = _this.testGroups.find(function (group) { return group.name === testName; });
                    });
                }
            }
        });
    };
    EnglishProficiencyComponent.prototype.primaryEnglishSelectionClick = function () {
        this.eliOptionFormControl.setValue(EEliOption.NOT_APPLICABLE);
    };
    /**
     * handle save click event
     * @param event button event
     */
    EnglishProficiencyComponent.prototype.onSaveClick = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.englishProfForm.valid) {
            this.saving$ = this.store.select(englishProficiencySelectors.selectSaving);
            this.store
                .select(applicantInfoSelectors.selectApplicationID)
                .pipe(tap(function (appId) {
                var newEnglishProf = null;
                // map the value back to match server expected object,
                // can be simplify by modifying server code to match client object
                switch (_this.eliOptionFormControl.value) {
                    // set upload document to true since every document is required
                    case EEliOption.SUBMIT_SCORE:
                        newEnglishProf = new EnglishProficiency(appId, _this.eliOptionFormControl.value, tslib_1.__assign({}, _this.eliOptionDetailFormControl.value), null, true);
                        break;
                    case EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS:
                        newEnglishProf = new EnglishProficiency(appId, _this.eliOptionFormControl.value, null, tslib_1.__assign({}, _this.eliOptionDetailFormControl.value), true);
                        break;
                    default:
                        newEnglishProf = new EnglishProficiency(appId, _this.eliOptionFormControl.value);
                }
                // submit the form
                _this.store.dispatch(new SubmitEnglishProficiency(newEnglishProf));
            }), takeUntil(this.destroyed$))
                .subscribe();
        }
        else {
            validateAllFormFields(this.englishProfForm);
            var error = new AppSubmitError(null, 'Your data is invalid, please go back and fix the errors');
            this.store.dispatch(new DisplayErrorMessage({ error: error }));
        }
    };
    Object.defineProperty(EnglishProficiencyComponent.prototype, "eliOptionDetailFormControl", {
        get: function () {
            return this.englishProfForm.get('eliOptionDetail');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnglishProficiencyComponent.prototype, "eliOptionFormControl", {
        get: function () {
            return this.englishProfForm.get('eliOption');
        },
        enumerable: true,
        configurable: true
    });
    EnglishProficiencyComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild('scoreSelect'),
        tslib_1.__metadata("design:type", Object)
    ], EnglishProficiencyComponent.prototype, "scoreSelect", void 0);
    EnglishProficiencyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-english-proficiency',
            templateUrl: './english-proficiency.component.html',
            styleUrls: ['./english-proficiency.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Store,
            MediaObserver])
    ], EnglishProficiencyComponent);
    return EnglishProficiencyComponent;
}());
export { EnglishProficiencyComponent };
//# sourceMappingURL=english-proficiency.component.js.map