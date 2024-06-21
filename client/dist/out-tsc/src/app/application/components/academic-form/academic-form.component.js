import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AcademicInfo, AppSubmitError, ESchoolLevel } from 'shared/models';
import { DisplayErrorMessage, LoadAcademicInfo, SubmitAcademicInfo } from 'app/store/actions';
import { academicSelectors } from 'app/store/selectors';
import { markFormGroupTouched } from 'app/utils';
/**
 * Academic Form Component, main component for academic info data
 */
var AcademicFormComponent = /** @class */ (function () {
    function AcademicFormComponent(formBuilder, store) {
        this.formBuilder = formBuilder;
        this.store = store;
        /**
         *  control form data and status
         */
        this.academicInfo = {
            data: null,
            loading: false,
            error: null
        };
        /**
         * let observable know when to unsubscribe, will be marked as completed whenever the form is destroy
         */
        this.destroyed$ = new Subject();
        this.isLoadingError = false;
    }
    AcademicFormComponent.prototype.ngOnInit = function () {
        // dispatch LoadProgramChoice and LoadAcademicInfo action
        this.store.dispatch(new LoadAcademicInfo());
        this.saving$ = this.store.select(academicSelectors.selectSaving);
        // create form structure
        this.createForm();
        // get the error and display message accordingly
        this.watchError();
        // get the data and loading for the store and do some actions
        this.fetchFormData();
    };
    /**
     * initialize academic form skeleton
     */
    AcademicFormComponent.prototype.createForm = function () {
        this.academicForm = this.formBuilder.group({
            highSchool: this.createPostSecondaryEdu(ESchoolLevel.HIGH_SCHOOL),
            postSecondaryEdus: this.formBuilder.array([])
        });
    };
    /**
     * create a new FormGroup for post secondary education, supporting dynamically add and remove post secondary edu
     * @param level post secondary education level, of type ESchoolLevel
     */
    AcademicFormComponent.prototype.createPostSecondaryEdu = function (level) {
        if (level === void 0) { level = null; }
        return this.formBuilder.group({
            name: [null, Validators.required],
            level: [level, Validators.required],
            graduatedFlag: [true, Validators.required],
            uploadDocumentsFlag: [true, Validators.required]
        });
    };
    /**
     * dynamically add a post secondary education FormGroup into the FormArray
     */
    AcademicFormComponent.prototype.addPostSecondaryEdu = function () {
        this.postSecondaryEdus.push(this.createPostSecondaryEdu());
    };
    /**
     * dynamically remove a post secondary education FormGroup into the FormArray
     * @param index the index of target FormGroup
     */
    AcademicFormComponent.prototype.removePostSecondaryEdu = function (index) {
        this.postSecondaryEdus.removeAt(index);
    };
    Object.defineProperty(AcademicFormComponent.prototype, "postSecondaryEdus", {
        get: function () {
            return this.academicForm.get('postSecondaryEdus');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * listen for error and display a snackbar when error occurs
     */
    AcademicFormComponent.prototype.watchError = function () {
        var _this = this;
        this.store
            .select(academicSelectors.selectError)
            .pipe(tap(function (error) {
            if (error) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: error,
                    callback: function () { return _this.store.dispatch(new LoadAcademicInfo()); }
                }));
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
    };
    /**
     * load academic info data and loading state, put data into the form if exist
     */
    AcademicFormComponent.prototype.fetchFormData = function () {
        var _this = this;
        combineLatest(this.store.select(academicSelectors.selectLoading), this.store.select(academicSelectors.selectLatest))
            .pipe(map(function (_a) {
            var loading = _a[0], data = _a[1];
            // add form control dynamically base on the data returning from the api
            if (!loading && data) {
                _this.isLoadingError = false;
                // add form control dynamically base on the data returning from the api
                var difference = data.postSecondaryEdus.length - _this.postSecondaryEdus.length;
                for (var i = 0; i < Math.abs(difference); i++) {
                    difference > 0
                        ? _this.addPostSecondaryEdu()
                        : _this.removePostSecondaryEdu(i);
                }
                // map the value from the api to the form controls
                _this.academicForm.patchValue(data);
            }
            return {
                data: data,
                loading: loading
            };
        }), takeUntil(this.destroyed$))
            .subscribe(function (formValue) {
            if (formValue) {
                _this.academicInfo = formValue;
            }
        });
    };
    /**
     * handle save button event
     * @param event button event
     */
    AcademicFormComponent.prototype.onSaveClick = function (event) {
        event.preventDefault();
        // check for validity
        if (this.academicForm.valid) {
            // destructure data from the form and create a new AcademicInfo object
            var _a = this.academicForm.value, highSchool = _a.highSchool, postSecondaryEdus = _a.postSecondaryEdus;
            var newAcademicInfo = new AcademicInfo(this.academicInfo.data.id, [highSchool].concat(postSecondaryEdus));
            this.store.dispatch(new SubmitAcademicInfo(newAcademicInfo));
        }
        else {
            markFormGroupTouched(this.academicForm);
            var error = new AppSubmitError(null, 'Your data is invalid, please go back and fix the errors');
            this.store.dispatch(new DisplayErrorMessage({ error: error }));
        }
    };
    AcademicFormComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    AcademicFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-academic-form',
            templateUrl: './academic-form.component.html',
            styleUrls: ['./academic-form.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Store])
    ], AcademicFormComponent);
    return AcademicFormComponent;
}());
export { AcademicFormComponent };
//# sourceMappingURL=academic-form.component.js.map