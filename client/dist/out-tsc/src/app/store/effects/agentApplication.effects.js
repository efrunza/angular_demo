import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { EAgentApplicationActions, LoadAgentApplicationsFail, LoadAgentApplicationsSuccess } from '../actions';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AppLoadError } from 'shared/models';
import { AgentApplicationService } from 'shared/services/api/agent-application.service';
var AgentApplicationEffects = /** @class */ (function () {
    function AgentApplicationEffects(actions$, service) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.destroyed$ = new Subject();
        this.getAgentApplications$ = this.actions$.pipe(ofType(EAgentApplicationActions.LOAD_AGENT_APPLICATIONS), switchMap(function () {
            return _this.service.loadAgentApplications().pipe(map(function (agentApplications) {
                return new LoadAgentApplicationsSuccess(agentApplications);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppLoadError(error.id, error.message)
                    : new AppLoadError();
                return observableOf(new LoadAgentApplicationsFail(displayError));
            }), takeUntil(_this.destroyed$));
        }));
    }
    AgentApplicationEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], AgentApplicationEffects.prototype, "getAgentApplications$", void 0);
    AgentApplicationEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            AgentApplicationService])
    ], AgentApplicationEffects);
    return AgentApplicationEffects;
}());
export { AgentApplicationEffects };
//# sourceMappingURL=agentApplication.effects.js.map