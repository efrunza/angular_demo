import * as tslib_1 from "tslib";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EInfoReleaseActions, LoadInfoReleaseFail, LoadInfoReleaseSuccess, SubmitInfoReleaseFail, SubmitInfoReleaseSuccess } from '../actions';
import { AppLoadError, AppSubmitError, InfoRelease } from 'shared/models';
import { InfoReleaseService } from 'shared/services/api/info-release.service';
import { of as observableOf } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { applicantInfoSelectors, infoReleaseSelectors } from '../selectors';
import { Store } from '@ngrx/store';
var InfoReleaseEffects = /** @class */ (function () {
    function InfoReleaseEffects(infoReleaseService, actions$, store) {
        var _this = this;
        this.infoReleaseService = infoReleaseService;
        this.actions$ = actions$;
        this.store = store;
        this.getInfoRelease$ = this.actions$.pipe(ofType(EInfoReleaseActions.LOAD_INFO_RELEASE), withLatestFrom(this.store.select(infoReleaseSelectors.selectInfoReleaseData)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            return stored
                ? observableOf(new LoadInfoReleaseSuccess(stored))
                : _this.infoReleaseService.loadInfoRelease().pipe(withLatestFrom(_this.store.select(applicantInfoSelectors.selectApplicationID)), map(function (_a) {
                    var info = _a[0], appId = _a[1];
                    if (!info || Object.entries(info).length === 0) {
                        return new LoadInfoReleaseSuccess(new InfoRelease(appId));
                    }
                    else {
                        var newInfoRelease = new InfoRelease(appId, info);
                        return new LoadInfoReleaseSuccess(newInfoRelease);
                    }
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(new LoadInfoReleaseFail(displayError));
                }));
        }));
        this.submitInfoRelease$ = this.actions$.pipe(ofType(EInfoReleaseActions.SUBMIT_INFO_RELEASE), switchMap(function (action) {
            var submitPayload = tslib_1.__assign({}, action.payload.info);
            return _this.infoReleaseService.submitInfoRelease(submitPayload).pipe(map(function () {
                return new SubmitInfoReleaseSuccess(action.payload);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppSubmitError(error.id, error.message)
                    : new AppSubmitError();
                return observableOf(new SubmitInfoReleaseFail(displayError));
            }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], InfoReleaseEffects.prototype, "getInfoRelease$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], InfoReleaseEffects.prototype, "submitInfoRelease$", void 0);
    InfoReleaseEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [InfoReleaseService,
            Actions,
            Store])
    ], InfoReleaseEffects);
    return InfoReleaseEffects;
}());
export { InfoReleaseEffects };
//# sourceMappingURL=infoRelease.effects.js.map