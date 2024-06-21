import * as tslib_1 from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LanguageListService } from 'shared/services/api/language-list.service';
import { ELanguageListActions, LoadLanguageListFail, LoadLanguageListSuccess } from 'app/store/actions';
import { Observable, of as observableOf, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AppLoadError } from 'shared/models';
import { languageListSelectors } from '../selectors';
var LanguageListEffects = /** @class */ (function () {
    function LanguageListEffects(actions$, service, stored) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.stored = stored;
        this.destroyed$ = new Subject();
        this.getLanguageList$ = this.actions$.pipe(ofType(ELanguageListActions.LOAD_LANGUAGE_LIST), withLatestFrom(this.stored.select(languageListSelectors.selectAll)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            return stored.length !== 0
                ? of(new LoadLanguageListSuccess(stored))
                : _this.service.getLanguageList().pipe(map(function (LanguageList) {
                    return new LoadLanguageListSuccess(LanguageList);
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(new LoadLanguageListFail(displayError));
                }));
        }), takeUntil(this.destroyed$));
    }
    LanguageListEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], LanguageListEffects.prototype, "getLanguageList$", void 0);
    LanguageListEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            LanguageListService,
            Store])
    ], LanguageListEffects);
    return LanguageListEffects;
}());
export { LanguageListEffects };
//# sourceMappingURL=languageList.effects.js.map