import * as tslib_1 from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicantInfo, AppLoadError } from 'app/shared/models';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { EApplicantInfoActions, LoadApplicantInfoFail, LoadApplicantInfoSuccess } from '../actions';
import { ApplicantInfoService } from 'shared/services/api/applicant-info.service';
var ApplicantInfoEffects = /** @class */ (function () {
    function ApplicantInfoEffects(actions$, service) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.destroyed$ = new Subject();
        this.getApplicantInfo$ = this.actions$.pipe(takeUntil(this.destroyed$), ofType(EApplicantInfoActions.LOAD_APPLICANT_INFO), switchMap(function (action) {
            var payload = action.payload;
            return _this.service.getApplicantInfo(payload).pipe(map(function (applicantInfo) {
                if (!applicantInfo || Object.entries(applicantInfo).length === 0) {
                    // creating an empty applicant info object for new applicants
                    applicantInfo = new ApplicantInfo();
                }
                return new LoadApplicantInfoSuccess(applicantInfo);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppLoadError(error.id, error.message)
                    : new AppLoadError();
                return observableOf(new LoadApplicantInfoFail(displayError));
            }));
        }));
    }
    ApplicantInfoEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], ApplicantInfoEffects.prototype, "getApplicantInfo$", void 0);
    ApplicantInfoEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            ApplicantInfoService])
    ], ApplicantInfoEffects);
    return ApplicantInfoEffects;
}());
export { ApplicantInfoEffects };
//# sourceMappingURL=applicantInfo.effects.js.map