import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProgramDialogComponent } from '../program-dialog/program-dialog.component';
import { Subject } from 'rxjs';
import { AppSubmitError, EEliOption, EErrorType, ENGLISH_LANGUAGE_INSTITUTE, InfoMissingException } from 'shared/models';
import { takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DisplayErrorMessage, LoadPrograms } from 'app/store/actions';
import { MediaObserver } from '@angular/flex-layout';
import { applicantInfoSelectors, englishProficiencySelectors, personalInfoSelectors } from 'app/store/selectors';
/**
 * Input Choice Component
 *
 * control and manage individual choice
 */
var InputChoiceComponent = /** @class */ (function () {
    function InputChoiceComponent(dialog, store, snackBar, mediaObserver) {
        var _this = this;
        this.dialog = dialog;
        this.store = store;
        this.snackBar = snackBar;
        this.mediaObserver = mediaObserver;
        /**
         *  determined when to switch to mobile display mode
         */
        this.isMobile = false;
        this.destroyed$ = new Subject();
        /**
         * decide whether the asterisk will be shown or not
         */
        this.isRequired = false;
        /**
         * the date dialog will be displayed when datepicker opens
         */
        this.initialDate = new Date();
        this.englishProf = null;
        this.isLoadingError = false;
        this.isLoadingErrorChange = new EventEmitter();
        this.applicantInfo = null;
        this.personalInfo = null;
        this.normalAppliedMonths = [0, 4, 8];
        /**
         * filter apply date
         *
         * the english program can be applied every 2 months whereas normal programs can only be applied in certain months
         *
         * @param date selected date
         */
        this.dateFilter = function (date) {
            if (_this.applicantInfo || _this.englishProf) {
                // get the latest eliOption (englishProf.eliOption > applicationInfo.eliOption)
                var eliOption = _this.englishProf && _this.englishProf.eliOption
                    ? _this.englishProf.eliOption
                    : _this.applicantInfo.EliOption;
                return eliOption === EEliOption.ATTEND_ELI && _this.isRequired
                    ? date.getMonth() % 2 === 0
                    : _this.normalAppliedMonths.includes(date.getMonth());
            }
            return false;
        };
        mediaObserver
            .asObservable()
            .pipe(tap(function (changes) {
            _this.isMobile = !!changes.find(function (change) { return change.mqAlias === 'lt-md'; });
        }), takeUntil(this.destroyed$))
            .subscribe();
    }
    InputChoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get current Application Info for application Id and/or eliOption value
        this.store
            .select(applicantInfoSelectors.selectCurrentAppInfo)
            .pipe(tap(function (applicantInfo) {
            if (applicantInfo) {
                _this.applicantInfo = applicantInfo;
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
        // get eliOption from the store
        this.store
            .select(englishProficiencySelectors.selectEnglishProfData)
            .pipe(tap(function (englishProf) {
            if (englishProf) {
                _this.englishProf = englishProf;
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
        // get personal info data for countryOA value
        this.store
            .select(personalInfoSelectors.selectFormatted)
            .pipe(tap(function (personalInfo) {
            if (personalInfo) {
                _this.personalInfo = personalInfo;
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
        // subscribe to startDate input and disable select program button accordingly
        this.startDateFormControl.registerOnChange(function () {
            if (_this.descriptionFormControl.value !==
                ENGLISH_LANGUAGE_INSTITUTE.programDesc) {
                _this.descriptionFormControl.reset();
                _this.campusFormControl.reset();
            }
        });
        // subscribe to program input and disable select program button accordingly
    };
    /**
     * assign selected date to the date picker input right after the month is selected
     *
     * @param selectedDate selected date
     * @param datePicker date picker component itself
     */
    InputChoiceComponent.prototype.onMonthSelected = function (selectedDate, datePicker) {
        this.startDateFormControl.setValue(new Date(selectedDate));
        datePicker.close();
    };
    Object.defineProperty(InputChoiceComponent.prototype, "startDateFormControl", {
        get: function () {
            return this.choiceFormGroup.get('startDate');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputChoiceComponent.prototype, "descriptionFormControl", {
        get: function () {
            return this.choiceFormGroup.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputChoiceComponent.prototype, "campusFormControl", {
        get: function () {
            return this.choiceFormGroup.get('campus');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * handle program selection
     */
    InputChoiceComponent.prototype.onSelectProgramClick = function () {
        var _this = this;
        if (!this.startDateFormControl.value || !this.startDateFormControl.valid) {
            // prevent user from selecting a program when a date is not selected
            this.store.dispatch(new DisplayErrorMessage({
                error: new AppSubmitError(null, 'Please select a start date first.')
            }));
            // prevent user from selecting another program when eliOption is '2'
        }
        else if (this.descriptionFormControl.value ===
            ENGLISH_LANGUAGE_INSTITUTE.programDesc) {
            this.store.dispatch(new DisplayErrorMessage({
                error: new AppSubmitError(null, 'Cannot select a program because ELI is selected.')
            }));
        }
        else {
            try {
                // no need to validation here since if the startDate is empty, the button is disable anyway
                var startDate = new Date(this.startDateFormControl.value);
                // get the country OA
                var countryOA = this.applicantInfo && this.applicantInfo.countryOA
                    ? this.applicantInfo.countryOA
                    : this.applicantInfo.countryOA;
                if (countryOA) {
                    // prepare the request body payload
                    var reqParamPayload = {
                        id: this.index.toString(),
                        year: startDate.getFullYear(),
                        month: startDate.getMonth() + 1,
                        visa: countryOA
                    };
                    this.store.dispatch(new LoadPrograms(reqParamPayload));
                }
                else
                    throw Error(new InfoMissingException().message);
                // get the list of current choice and pass it to the dialog
                var currentProgramChoices = this.choiceFormGroup.parent.value.map(function (item) { return item.description; });
                // open the dialog with the data from the pipe
                var dialogRef = this.dialog.open(ProgramDialogComponent, {
                    panelClass: 'dialog-container',
                    width: this.isMobile ? '100vw' : '50vw',
                    data: {
                        programs: [],
                        currentProgramChoices: currentProgramChoices
                    }
                });
                // handle when the dialog is closed, get the data from the dialog
                // and map it with current state
                dialogRef.afterClosed().subscribe(function (selectedProgram) {
                    if (selectedProgram) {
                        var newProgram = {
                            startDate: _this.startDateFormControl.value,
                            program: selectedProgram.programCode,
                            campus: selectedProgram.campus,
                            description: selectedProgram.programDesc,
                            acadPlan: selectedProgram.acadPlan,
                            acadCareer: selectedProgram.acadCareer
                        };
                        _this.choiceFormGroup.patchValue(newProgram);
                    }
                });
            }
            catch (e) {
                var error = {
                    id: '223A',
                    message: 'something went wrong.. please try again later',
                    type: EErrorType.SUBMIT
                };
                this.store.dispatch(new DisplayErrorMessage({ error: error }));
            }
        }
    };
    InputChoiceComponent.prototype.onDeleteProgramClick = function () {
        this.choiceFormGroup.reset();
    };
    InputChoiceComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], InputChoiceComponent.prototype, "isRequired", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], InputChoiceComponent.prototype, "choiceFormGroup", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], InputChoiceComponent.prototype, "index", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], InputChoiceComponent.prototype, "maxDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], InputChoiceComponent.prototype, "minDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], InputChoiceComponent.prototype, "isLoadingError", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], InputChoiceComponent.prototype, "isLoadingErrorChange", void 0);
    InputChoiceComponent = tslib_1.__decorate([
        Component({
            selector: 'app-input-choice',
            templateUrl: './input-choice.component.html',
            styleUrls: ['./input-choice.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            Store,
            MatSnackBar,
            MediaObserver])
    ], InputChoiceComponent);
    return InputChoiceComponent;
}());
export { InputChoiceComponent };
//# sourceMappingURL=input-choice.component.js.map