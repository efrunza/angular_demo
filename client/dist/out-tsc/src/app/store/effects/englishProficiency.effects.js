import * as tslib_1 from "tslib";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EEnglishProficiencyActions, LoadEnglishProficiencyFail, LoadEnglishProficiencySuccess, SubmitEnglishProficiencyFail, SubmitEnglishProficiencySuccess } from '../actions';
import { AppLoadError, EnglishProficiency } from 'shared/models';
import { EnglishProficiencyService } from 'shared/services/api/english-proficiency.service';
import { of as observableOf } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { applicantInfoSelectors, englishProficiencySelectors } from '../selectors';
import { Store } from '@ngrx/store';
var EnglishProficiencyEffects = /** @class */ (function () {
    function EnglishProficiencyEffects(service, actions$, store) {
        var _this = this;
        this.service = service;
        this.actions$ = actions$;
        this.store = store;
        this.loadEnglishProficiency$ = this.actions$.pipe(ofType(EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY), withLatestFrom(this.store.select(englishProficiencySelectors.selectEnglishProfData)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            return stored
                ? observableOf(new LoadEnglishProficiencySuccess(stored))
                : _this.service.getEnglishProficiency().pipe(withLatestFrom(_this.store.select(applicantInfoSelectors.selectApplicationID)), map(function (_a) {
                    var englishProf = _a[0], appId = _a[1];
                    if (!englishProf || Object.entries(englishProf).length === 0) {
                        return new LoadEnglishProficiencySuccess(new EnglishProficiency(appId));
                    }
                    else {
                        return new LoadEnglishProficiencySuccess(new EnglishProficiency(appId, englishProf.EliOption, {
                            name: englishProf.TestName,
                            score: englishProf.TestScore,
                            date: englishProf.TestDate,
                            country: englishProf.TestCountry
                        }, {
                            name: englishProf.PartnerName,
                            dateCompletion: englishProf.PartnerDateCompletion
                        }, englishProf.uploadDocument));
                    }
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(new LoadEnglishProficiencyFail(displayError));
                }));
        }));
        this.submitEnglishProficiency$ = this.actions$.pipe(ofType(EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY), switchMap(function (action) {
            var _a = action.payload, eliOption = _a.eliOption, partner = _a.partner, test = _a.test, uploadDocument = _a.uploadDocument;
            var formatted = {
                EliOption: eliOption,
                PartnerDateCompletion: partner ? partner.dateCompletion : null,
                PartnerName: partner ? partner.name : null,
                TestCountry: test ? test.country : null,
                TestDate: test ? test.date : null,
                TestName: test ? test.name : null,
                TestScore: test ? test.score : null,
                uploadDocument: uploadDocument
            };
            return _this.service.postEnglishProficiency(formatted).pipe(map(function () {
                return new SubmitEnglishProficiencySuccess(action.payload);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppLoadError(error.id, error.message)
                    : new AppLoadError();
                return observableOf(new SubmitEnglishProficiencyFail(displayError));
            }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], EnglishProficiencyEffects.prototype, "loadEnglishProficiency$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], EnglishProficiencyEffects.prototype, "submitEnglishProficiency$", void 0);
    EnglishProficiencyEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [EnglishProficiencyService,
            Actions,
            Store])
    ], EnglishProficiencyEffects);
    return EnglishProficiencyEffects;
}());
export { EnglishProficiencyEffects };
//# sourceMappingURL=englishProficiency.effects.js.map