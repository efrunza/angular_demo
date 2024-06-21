import * as tslib_1 from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PersonalInfoService } from 'shared/services/api/personal-info.service';
import { EPersonalInfoActions, LoadApplicantInfo, LoadPersonalInfoSuccess, SubmitPersonalInfoFail, SubmitPersonalInfoSuccess, LoadPersonalInfoFail } from 'app/store/actions';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AppLoadError, AppSubmitError, PersonalInfo } from 'shared/models';
import { commonEnv } from 'environments/environment.common';
import { AuthService } from 'app/auth/auth.service';
import { applicantInfoSelectors, personalInfoSelectors } from '../selectors';
var PersonalInfoEffects = /** @class */ (function () {
    function PersonalInfoEffects(actions$, service, store, authService) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.store = store;
        this.authService = authService;
        this.destroyed$ = new Subject();
        this.getPersonalInfo$ = this.actions$.pipe(ofType(EPersonalInfoActions.LOAD_PERSONAL_INFO), withLatestFrom(this.store.select(personalInfoSelectors.selectFormatted)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            return stored
                ? observableOf(new LoadPersonalInfoSuccess(stored))
                : _this.service.getPersonalInfo().pipe(withLatestFrom(_this.store.select(applicantInfoSelectors.selectApplicationID)), map(function (_a) {
                    var personalInfo = _a[0], appId = _a[1];
                    if (!personalInfo || Object.entries(personalInfo).length === 0) {
                        // creating an empty personal info object for new applicants
                        personalInfo = new PersonalInfo();
                    }
                    if (appId) {
                        personalInfo.appId = appId;
                    }
                    return new LoadPersonalInfoSuccess(personalInfo);
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(new LoadPersonalInfoFail(displayError));
                }));
        }), takeUntil(this.destroyed$));
        this.postPersonalInfo$ = this.actions$.pipe(ofType(EPersonalInfoActions.SUBMIT_PERSONAL_INFO), switchMap(function (action) {
            return _this.service.postPersonalInfo(action.payload).pipe(takeUntil(_this.destroyed$), map(function (applicantInfo) {
                var appId = applicantInfo.appId;
                if (_this.authService.getUserInfo().tfp === commonEnv.agentSignInPolicy) {
                    _this.store.dispatch(new LoadApplicantInfo(appId));
                }
                else {
                    _this.store.dispatch(new LoadApplicantInfo());
                }
                // TODO: catch an error if the post API doesn't return anything aka no payload here
                // returning applicantInfo in the personal info submit success response from the back-end
                return new SubmitPersonalInfoSuccess(action.payload);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppSubmitError(error.id, error.message)
                    : new AppSubmitError();
                return observableOf(new SubmitPersonalInfoFail(displayError));
            }));
        }));
    }
    PersonalInfoEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], PersonalInfoEffects.prototype, "getPersonalInfo$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], PersonalInfoEffects.prototype, "postPersonalInfo$", void 0);
    PersonalInfoEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            PersonalInfoService,
            Store,
            AuthService])
    ], PersonalInfoEffects);
    return PersonalInfoEffects;
}());
export { PersonalInfoEffects };
//# sourceMappingURL=personalInfo.effects.js.map