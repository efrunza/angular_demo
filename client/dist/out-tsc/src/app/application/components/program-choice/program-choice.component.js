import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AppSubmitError, EEliOption, EErrorType } from 'shared/models';
import { DisplayErrorMessage, LoadProgramChoices, SubmitProgramChoices } from 'app/store/actions';
import { applicantInfoSelectors, englishProficiencySelectors, programChoiceSelectors } from 'app/store/selectors';
import { campusCodeConverter, isAnyPropEmpty } from 'app/utils';
import { YearMonthDateAdapter } from './customDateAdapter';
export var YEAR_MONTH_DATE_FORMAT = {
    parse: {
        dateInput: 'YYYY-MM-dd'
    },
    display: {
        dateInput: 'YYYY-MM',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
/**
 * Program Choice Component
 *
 * Main component for displaying list of program choices
 */
var ProgramChoiceComponent = /** @class */ (function () {
    function ProgramChoiceComponent(router, formBuilder, store) {
        var _this = this;
        this.router = router;
        this.formBuilder = formBuilder;
        this.store = store;
        // control current data and status of the form
        this.programChoice = {
            data: null,
            loading: true,
            error: null
        };
        // let observable know when to unsubscribe, will be marked as completed whenever the form is destroyed
        this.destroyed$ = new Subject();
        this.isLoadingError = false;
        this.applicantInfo = null;
        this.englishProf = null;
        this.normalAppliedMonths = [0, 4, 8];
        /**
         * handle save button event
         * @param event button event
         */
        this.onSaveClick = function (event) {
            event.preventDefault();
            if (_this.programChoiceForm.valid) {
                // remove whatever choice that is not completed from the final data before posting to the server
                var choices = _this.reformatChoices(_this.programChoiceForm.value.choices);
                // dispatch submit action
                // page navigation is handled by 'shared.effects.ts'
                _this.store.dispatch(new SubmitProgramChoices(choices));
            }
            else {
                var error = new AppSubmitError(null, 'Your data is invalid, please go back and fix the errors');
                _this.store.dispatch(new DisplayErrorMessage({ error: error }));
            }
        };
    }
    ProgramChoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(new LoadProgramChoices());
        // create form structure
        this.initialForm();
        // get the error for LoadProgramChoice and LoadProgramList action, display message accordingly
        this.watchError();
        // create detail of the form structure
        this.createForm();
        // get the data and loading for the store and do some actions
        this.fetchFormData();
        // subscribe and display saving status
        this.saving$ = this.store.select(programChoiceSelectors.selectSaving);
        this.store
            .select(applicantInfoSelectors.selectCurrentAppInfo)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function (applicantInfo) {
            if (applicantInfo) {
                _this.applicantInfo = applicantInfo;
            }
        });
        this.store
            .select(englishProficiencySelectors.selectEnglishProfData)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function (englishProf) {
            if (englishProf) {
                _this.englishProf = englishProf;
            }
        });
    };
    /**
     * initialize form skeleton
     */
    ProgramChoiceComponent.prototype.initialForm = function () {
        this.programChoiceForm = this.formBuilder.group({
            choices: this.formBuilder.array([])
        });
    };
    /**
     * listen for error and display a snackbar when error occurs
     */
    ProgramChoiceComponent.prototype.watchError = function () {
        var _this = this;
        this.store
            .select(programChoiceSelectors.selectError)
            .pipe(tap(function (error) {
            if (error) {
                if (error.type === EErrorType.LOAD) {
                    _this.store.dispatch(new DisplayErrorMessage({
                        error: error,
                        callback: function () { return _this.store.dispatch(new LoadProgramChoices()); }
                    }));
                }
                else {
                    _this.store.dispatch(new DisplayErrorMessage({ error: error }));
                }
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
    };
    /**
     * dynamically add or remove FormGroup base on the data
     */
    ProgramChoiceComponent.prototype.createForm = function () {
        // currently there are only 3 choices
        var NUMBER_OF_CHOICES = 3;
        // only try to add new choice if the choice number does not reach maximum choice number
        if (this.choices.length !== NUMBER_OF_CHOICES) {
            // somehow the choices created does not match maximum choices number, need clearing
            if (this.choices.length !== 0) {
                for (var i = 0; i < this.choices.length; i++) {
                    this.choices.removeAt(i);
                }
            }
            var _loop_1 = function (i) {
                var formGroup = this_1.createChoiceFormGroup();
                // the first choice is a special case
                // which requires inputs from other form and validator of required
                if (i === 0) {
                    // set required status for all control of the first choice
                    Object.keys(formGroup.controls).forEach(function (key) {
                        var targetControl = formGroup.controls[key];
                        targetControl.setValidators([Validators.required]);
                    });
                }
                this_1.choices.push(formGroup);
            };
            var this_1 = this;
            // create 3 program choices and make the first choice to be required
            for (var i = 0; i < NUMBER_OF_CHOICES; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * create a program choice form group
     */
    ProgramChoiceComponent.prototype.createChoiceFormGroup = function () {
        return this.formBuilder.group({
            startDate: [null],
            description: [null],
            campus: [null],
            program: [null],
            acadPlan: [null],
            acadCareer: [null]
        });
    };
    Object.defineProperty(ProgramChoiceComponent.prototype, "choices", {
        get: function () {
            return this.programChoiceForm.get('choices');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * load program choice data, country list and loading state, put data into the form if exist
     */
    ProgramChoiceComponent.prototype.fetchFormData = function () {
        var _this = this;
        combineLatest(this.store.select(programChoiceSelectors.selectLoading), this.store.select(programChoiceSelectors.selectProgramChoice))
            .pipe(map(function (_a) {
            var loading = _a[0], programChoice = _a[1];
            // setting the loading of program choice based on the loading state
            _this.programChoice.loading = loading;
            // only patch the form value when choices and programs are loaded successfully
            if (programChoice && Object.entries(programChoice).length !== 0) {
                for (var i = 0; i < programChoice.choices.length; i++) {
                    if (!programChoice.choices[i]) {
                        programChoice.choices[i] = {
                            startDate: null,
                            program: null,
                            campus: null,
                            acadPlan: null,
                            acadCareer: null,
                            description: null
                        };
                    }
                }
                // set any previous load error in the form to be false
                _this.isLoadingError = false;
                _this.programChoiceForm.patchValue(programChoice);
            }
            return {
                loading: loading,
                data: programChoice
            };
        }), takeUntil(this.destroyed$))
            .subscribe(function (formValue) {
            if (formValue) {
                _this.programChoice = formValue;
            }
        });
    };
    /**
     * reformat the data before pushing to server
     * @param choices selected choices
     */
    ProgramChoiceComponent.prototype.reformatChoices = function (choices) {
        return choices.reduce(function (formattedChoices, choice) {
            if (!isAnyPropEmpty(choice)) {
                var formattedDate = new Date(choice.startDate);
                var formattedChoice = tslib_1.__assign({}, choice, { startDate: formattedDate.getFullYear() + "-" + (formattedDate.getMonth() +
                        1), campus: campusCodeConverter(choice.campus) });
                formattedChoices.push(formattedChoice);
            }
            return formattedChoices;
        }, []);
    };
    /**
     * calculate the term and determine minimum time to apply for a program
     * @param isFirstChoice for eli
     */
    ProgramChoiceComponent.prototype.minStartDateFactory = function (isFirstChoice) {
        if (isFirstChoice === void 0) { isFirstChoice = false; }
        var eliOption = this.englishProf
            ? this.englishProf.eliOption
            : this.applicantInfo.EliOption;
        var date = new Date();
        if (eliOption === EEliOption.ATTEND_ELI &&
            !isFirstChoice &&
            this.programChoiceForm.value.choices[0].startDate) {
            date = new Date(this.programChoiceForm.value.choices[0].startDate);
        }
        var nextTermMonth = this.normalAppliedMonths.find(function (month) { return month > date.getMonth(); });
        return new Date(nextTermMonth ? date.getFullYear() : date.getFullYear() + 1, nextTermMonth ? nextTermMonth : this.normalAppliedMonths[0], 1);
    };
    ProgramChoiceComponent.prototype.maxStartDateFactory = function (isFirstChoice) {
        if (isFirstChoice === void 0) { isFirstChoice = false; }
        var eliOption = this.englishProf
            ? this.englishProf.eliOption
            : this.applicantInfo.EliOption;
        if (eliOption === EEliOption.ATTEND_ELI && isFirstChoice) {
            var currentDate = new Date();
            return new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 3);
        }
        else {
            var currentDate = new Date();
            return new Date(currentDate.getFullYear() + 2, 11);
        }
    };
    ProgramChoiceComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    ProgramChoiceComponent = tslib_1.__decorate([
        Component({
            selector: 'app-program-choice',
            templateUrl: './program-choice.component.html',
            styleUrls: ['./program-choice.component.scss'],
            providers: [
                { provide: DateAdapter, useClass: YearMonthDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: YEAR_MONTH_DATE_FORMAT }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            FormBuilder,
            Store])
    ], ProgramChoiceComponent);
    return ProgramChoiceComponent;
}());
export { ProgramChoiceComponent };
//# sourceMappingURL=program-choice.component.js.map