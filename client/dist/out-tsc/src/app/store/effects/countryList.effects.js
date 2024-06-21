import * as tslib_1 from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppLoadError } from 'app/shared/models';
import { ECountryListActions, LoadCountryListFail, LoadCountryListSuccess } from 'app/store/actions';
import { Observable, of as observableOf, of, Subject } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, takeUntil } from 'rxjs/operators';
import { countryListSelectors } from '../selectors';
import { CountryListService } from 'shared/services/api/country-list.service';
var CountryListEffects = /** @class */ (function () {
    function CountryListEffects(actions$, service, store) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.store = store;
        this.destroyed$ = new Subject();
        this.getCountryList$ = this.actions$.pipe(ofType(ECountryListActions.LOAD_COUNTRY_LIST), withLatestFrom(this.store.select(countryListSelectors.selectAll)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            return stored.length !== 0
                ? of(new LoadCountryListSuccess(stored))
                : _this.service.getCountryList().pipe(map(function (CountryList) {
                    return new LoadCountryListSuccess(CountryList);
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(new LoadCountryListFail(displayError));
                }));
        }), takeUntil(this.destroyed$));
    }
    CountryListEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], CountryListEffects.prototype, "getCountryList$", void 0);
    CountryListEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            CountryListService,
            Store])
    ], CountryListEffects);
    return CountryListEffects;
}());
export { CountryListEffects };
//# sourceMappingURL=countryList.effects.js.map