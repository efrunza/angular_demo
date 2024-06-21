import * as tslib_1 from "tslib";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { EAcademicInfoActions, LoadAcademicInfoFail, LoadAcademicInfoSuccess, SubmitAcademicInfoFail, SubmitAcademicInfoSuccess } from '../actions';
import { Store } from '@ngrx/store';
import { AcademicInfo, AppLoadError, AppSubmitError } from 'shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { academicSelectors, applicantInfoSelectors } from '../selectors';
import { isAnyPropEmpty } from 'app/utils';
import { AcademicInfoService } from 'shared/services/api/academic-info.service';
var AcademicInfoEffects = /** @class */ (function () {
    function AcademicInfoEffects(actions$, service, store) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.store = store;
        this.destroyed$ = new Subject();
        this.getAcademicInfo$ = this.actions$.pipe(ofType(EAcademicInfoActions.LOAD_ACADEMIC_INFO), withLatestFrom(this.store.select(academicSelectors.selectSelectedAcademicInfo)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            // get the data from the store, if the data is already there,
            // dispatch the success action immediately, otherwise call the API to get the data
            return stored
                ? observableOf(new LoadAcademicInfoSuccess(stored))
                : _this.service.getAcademicInfo().pipe(withLatestFrom(_this.store.select(applicantInfoSelectors.selectApplicationID)), map(function (_a) {
                    var academicInfo = _a[0], appId = _a[1];
                    if (!academicInfo || Object.entries(academicInfo).length === 0) {
                        return new LoadAcademicInfoSuccess(new AcademicInfo(appId));
                    }
                    else {
                        academicInfo.id = appId;
                        return new LoadAcademicInfoSuccess(academicInfo);
                    }
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(new LoadAcademicInfoFail(displayError));
                }));
        }), takeUntil(this.destroyed$));
        this.postAcademicInfo$ = this.actions$.pipe(ofType(EAcademicInfoActions.SUBMIT_ACADEMIC_INFO), switchMap(function (action) {
            var newAcademicInfo = action.payload;
            newAcademicInfo.schoolsAttended = newAcademicInfo.schoolsAttended.reduce(function (formatted, schoolInfo) {
                if (!isAnyPropEmpty(schoolInfo)) {
                    formatted.push(schoolInfo);
                }
                return formatted;
            }, []);
            return _this.service.postAcademicInfo(newAcademicInfo).pipe(map(function () {
                return new SubmitAcademicInfoSuccess(newAcademicInfo);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppSubmitError(error.id, error.message)
                    : new AppSubmitError();
                return observableOf(new SubmitAcademicInfoFail(displayError));
            }), takeUntil(_this.destroyed$));
        }));
    }
    AcademicInfoEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], AcademicInfoEffects.prototype, "getAcademicInfo$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], AcademicInfoEffects.prototype, "postAcademicInfo$", void 0);
    AcademicInfoEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            AcademicInfoService,
            Store])
    ], AcademicInfoEffects);
    return AcademicInfoEffects;
}());
export { AcademicInfoEffects };
//# sourceMappingURL=academicInfo.effects.js.map