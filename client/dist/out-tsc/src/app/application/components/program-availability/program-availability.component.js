import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppLoadError, AppSubmitError } from 'shared/models';
import { DisplayErrorMessage, LoadApplicantInfo, LoadPrograms, ViewProgramListSuccess } from 'app/store/actions';
import { DateAdapter, MAT_DATE_FORMATS, MatPaginator, MatTableDataSource } from '@angular/material';
import { applicantInfoSelectors, programListSelectors } from 'app/store/selectors';
import { takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { YearMonthDateAdapter } from '../program-choice/customDateAdapter';
import { YEAR_MONTH_DATE_FORMAT } from '../program-choice/program-choice.component';
import { MediaObserver } from '@angular/flex-layout';
/**
 * Program Availability Component, main component for program list
 */
var ProgramAvailabilityComponent = /** @class */ (function () {
    function ProgramAvailabilityComponent(formBuilder, store, mediaObserver) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.store = store;
        this.mediaObserver = mediaObserver;
        /**
         * today's date
         */
        this.initialDate = new Date();
        /**
         * valid starting months for the program List
         */
        this.validProgramMonths = [0, 4, 8];
        /**
         * the month is set at 11 since in Date month is counted from 0
         */
        this.maxDate = new Date(this.initialDate.getFullYear() + 2, 11);
        this.minDate = new Date(this.initialDate.getFullYear(), this.initialDate.getMonth() + 1, 1);
        this.normalAppliedMonths = [0, 4, 8];
        /**
         * control the column name
         */
        this.displayedColumns = ['programCode', 'programName', 'campus'];
        /**
         * holding the state of programListData
         */
        this.programListData = {
            loading: false,
            list: []
        };
        /**
         * flag tracking if the page is loading (based on applicant info info selectors)
         */
        this.isLoading = true;
        /**
         * flag tracking the loading errors
         */
        this.isLoadingError = false;
        /**
         * holding the destroyed state of component
         */
        this.destroyed$ = new Subject();
        this.isMobile = false;
        /**
         * filter date for regular program
         *
         * the English program can be applied every 2 months whereas normal programs can only be applied in certain months
         * @param date selected date
         */
        //
        this.dateFilter = function (date) {
            return _this.validProgramMonths.includes(date.getMonth());
        };
        var date = new Date();
        var nextTermMonth = this.normalAppliedMonths.find(function (month) { return month > date.getMonth(); });
        this.minDate = new Date(nextTermMonth ? date.getFullYear() : date.getFullYear() + 1, nextTermMonth ? nextTermMonth : this.normalAppliedMonths[0], 1);
        // determined whether the user is in mobile or not
        mediaObserver
            .asObservable()
            .pipe(tap(function (changes) {
            _this.isMobile = !!changes.find(function (change) { return change.mqAlias === 'lt-md'; });
        }), takeUntil(this.destroyed$))
            .subscribe();
    }
    /**
     * assign selected date to the date picker input right after the month is selected
     * @param selectedDate date from the date picker
     * @param datePicker the date picker itself
     */
    ProgramAvailabilityComponent.prototype.onMonthSelected = function (selectedDate, datePicker) {
        this.programAvailabilityForm
            .get('programStartDate')
            .setValue(new Date(selectedDate));
        datePicker.close();
    };
    ProgramAvailabilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        // creates a form group for the program availability
        this.createFormGroup();
        // set the initial Date based on a valid program start Date in the current year
        while (this.validProgramMonths.includes(this.initialDate.getMonth()) === false ||
            this.initialDate.getMonth() === new Date().getMonth()) {
            this.initialDate.setMonth(this.initialDate.getMonth() + 1);
        }
        this.initialDate.setDate(1);
        // create an observable to keep track of selected date form field
        this.programAvailabilityForm
            .get('programStartDate')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe(function () {
            if (_this.programAvailabilityForm.get('programStartDate').valid) {
                _this.loadProgramList();
                _this.storeProgramList();
            }
            else {
                if (_this.dataSource) {
                    _this.dataSource = null;
                }
            }
        });
        // set the current date for the program start date field
        this.programAvailabilityForm
            .get('programStartDate')
            .setValue(this.initialDate);
        // get the error for LoadProgramList and display message accordingly
        this.selectErrorState();
    };
    /**
     * creates the programAvailabilityForm form group for the html template
     */
    ProgramAvailabilityComponent.prototype.createFormGroup = function () {
        this.programAvailabilityForm = this.formBuilder.group({
            programStartDate: [null, Validators.required]
        });
    };
    /**
     * get the correct error message for mat-hints based on the failed validator
     * @param control FormControl
     */
    ProgramAvailabilityComponent.prototype.getErrorMessages = function (control) {
        if (control.invalid) {
            return 'Please select a valid date';
        }
        else {
            return '';
        }
    };
    /**
     * function attempts to load the list of available programs based on the selected programStartDate
     */
    ProgramAvailabilityComponent.prototype.loadProgramList = function () {
        var _this = this;
        this.selectedStartDate = new Date(this.programAvailabilityForm.get('programStartDate').value);
        this.store
            .select(applicantInfoSelectors.selectCurrentAppInfo)
            .pipe(takeUntil(this.destroyed$), tap(function (appInfo) {
            if (appInfo.countryOA) {
                _this.isLoading = false;
                // the get request for the program list API requires an IProgramListReqParamPayload param
                try {
                    _this.reqParamPayload = {
                        // unused id based on the IProgramListReqParamPayload interface
                        id: '0',
                        year: _this.selectedStartDate.getFullYear(),
                        month: _this.selectedStartDate.getMonth() + 1,
                        visa: appInfo.countryOA
                    };
                    _this.store.dispatch(new LoadPrograms(_this.reqParamPayload));
                }
                catch (error) {
                    _this.store.dispatch(new DisplayErrorMessage({
                        error: new AppSubmitError(null, 'Unable to get list of programs')
                    }));
                }
            }
            else {
                _this.store.dispatch(new LoadApplicantInfo());
            }
        }))
            .subscribe();
    };
    /**
     * filter table data base on value
     * @param filterValue value to filter
     */
    ProgramAvailabilityComponent.prototype.applyFilter = function (filterValue) {
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    /**
     * store the list of available programs based on the selected programStartDate
     */
    ProgramAvailabilityComponent.prototype.storeProgramList = function () {
        var _this = this;
        // get all the programs in the list and take out whatever program is displayed
        combineLatest(this.store.select(applicantInfoSelectors.selectCurrentAppInfo), this.store.select(programListSelectors.selectSelectedProgramList))
            .pipe(takeUntil(this.destroyed$), tap(function (_a) {
            var appInfo = _a[0], programListData = _a[1];
            if (appInfo.countryOA && programListData) {
                if (!programListData.loading && programListData.list.length > 0) {
                    _this.isLoadingError = false;
                }
                _this.dataSource = new MatTableDataSource(programListData.list);
                setTimeout(function () { return (_this.dataSource.paginator = _this.paginator); });
                _this.programListData = programListData;
            }
            else if (!appInfo.countryOA && !_this.isLoading) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: new AppSubmitError(null, 'Unable to get user info')
                }));
            }
        }))
            .subscribe();
    };
    /**
     * gets the loading error state for the dispatched actions
     */
    ProgramAvailabilityComponent.prototype.selectErrorState = function () {
        var _this = this;
        this.store
            .select(programListSelectors.selectError)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(function (error) {
            if (error) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: error,
                    callback: function () {
                        _this.store.dispatch(new LoadApplicantInfo());
                    }
                }));
            }
        });
    };
    /**
     * save button event
     * @param event button event
     */
    ProgramAvailabilityComponent.prototype.onSaveClick = function (event) {
        var _this = this;
        // prevent page refresh onSubmit action
        event.preventDefault();
        if (this.programAvailabilityForm.valid) {
            // get error from the store and display the snackbar there is any
            this.store
                .select(programListSelectors.selectError)
                .pipe(tap(function (error) {
                if (!error) {
                    _this.store.dispatch(new ViewProgramListSuccess());
                }
                else {
                    _this.store.dispatch(new DisplayErrorMessage({
                        error: error,
                        callback: function () {
                            _this.store.dispatch(new LoadPrograms(_this.reqParamPayload));
                        }
                    }));
                }
            }))
                .subscribe();
        }
        else {
            this.store.dispatch(new DisplayErrorMessage({
                error: new AppLoadError(null, 'Failed to display available programs'),
                callback: function () {
                    _this.store.dispatch(new LoadPrograms(_this.reqParamPayload));
                }
            }));
        }
    };
    ProgramAvailabilityComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ProgramAvailabilityComponent.prototype, "paginator", void 0);
    ProgramAvailabilityComponent = tslib_1.__decorate([
        Component({
            selector: 'app-program-availability',
            templateUrl: './program-availability.component.html',
            styleUrls: ['./program-availability.component.scss'],
            providers: [
                { provide: DateAdapter, useClass: YearMonthDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: YEAR_MONTH_DATE_FORMAT }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Store,
            MediaObserver])
    ], ProgramAvailabilityComponent);
    return ProgramAvailabilityComponent;
}());
export { ProgramAvailabilityComponent };
//# sourceMappingURL=program-availability.component.js.map