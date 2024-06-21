import * as tslib_1 from "tslib";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProgramListService } from 'shared/services/api/program-list.service';
import { EProgramListActions, LoadProgramsSuccess } from '../actions';
import { AppLoadError } from 'shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { programListSelectors } from '../selectors';
import { campusNameConverter } from 'app/utils';
var ProgramListEffects = /** @class */ (function () {
    function ProgramListEffects(actions$, service, store) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.store = store;
        this.getProgramList$ = this.actions$.pipe(ofType(EProgramListActions.LOAD_PROGRAMS), withLatestFrom(this.store.select(programListSelectors.selectSelectedProgramList)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1];
            var _b = action.payload, year = _b.year, month = _b.month, id = _b.id, visa = _b.visa;
            if (stored &&
                stored.list.length !== 0 &&
                stored.id === id &&
                stored.month === month &&
                stored.year === year &&
                stored.visa === visa) {
                return observableOf(new LoadProgramsSuccess(stored));
            }
            else {
                var reqParams = {
                    year: year,
                    month: month,
                    visa: visa
                };
                return _this.service.getProgramLists(reqParams).pipe(map(function (programs) {
                    programs.forEach(function (program) { return (program.campus = campusNameConverter(program.campus)); });
                    var newProgramListItem = {
                        id: id,
                        list: programs,
                        visa: visa,
                        year: year,
                        month: month
                    };
                    return new LoadProgramsSuccess(newProgramListItem);
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    return observableOf(displayError);
                }));
            }
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], ProgramListEffects.prototype, "getProgramList$", void 0);
    ProgramListEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            ProgramListService,
            Store])
    ], ProgramListEffects);
    return ProgramListEffects;
}());
export { ProgramListEffects };
//# sourceMappingURL=programList.effects.js.map