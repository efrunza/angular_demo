import * as tslib_1 from "tslib";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { AppLoadError, ExpiredAgentException, InvalidAgentLoginException, InvalidUserInfoException } from 'shared/models';
import { AuthService } from 'app/auth/auth.service';
import { AddNewUser, AddNewUserFail, AddNewUserSuccess, EAuthActions, VerifyAgentFail, VerifyAgentSuccess } from '../actions/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { commonEnv } from '../../../environments/environment.common';
import { environment } from '../../../environments/environment';
var AuthEffects = /** @class */ (function () {
    function AuthEffects(actions$, service) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.destroyed$ = new Subject();
        this.addUser$ = this.actions$.pipe(ofType(EAuthActions.ADD_USER), map(function (action) {
            var agentId = action.payload;
            var msalUser = _this.service.getUserInfo();
            if (!msalUser)
                throw new InvalidUserInfoException();
            if (msalUser.tfp === commonEnv.agentSignInPolicy && !agentId) {
                throw new InvalidAgentLoginException();
            }
            if (msalUser.tfp === commonEnv.applicantSignInPolicy &&
                localStorage.getItem('msal.login.request') ===
                    environment.appUrl + "/" + commonEnv.azureAgentCallbackUrl)
                throw new InvalidAgentLoginException();
            var userInfo = tslib_1.__assign({}, msalUser, { agentId: agentId });
            return new AddNewUserSuccess(userInfo);
        }), catchError(function (err) {
            return observableOf(new AddNewUserFail(new AppLoadError(err.id, err.message)));
        }));
        this.verifyAgent$ = this.actions$.pipe(ofType(EAuthActions.VERIFY_AGENT), switchMap(function () {
            return _this.service.verifyAgent().pipe(switchMap(function (verifyResult) {
                if (!verifyResult || Object.entries(verifyResult).length === 0) {
                    throw new ExpiredAgentException();
                }
                else {
                    return [
                        new VerifyAgentSuccess(verifyResult),
                        new AddNewUser(verifyResult.agentId)
                    ];
                }
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppLoadError(error.id, error.message)
                    : new AppLoadError();
                return observableOf(new VerifyAgentFail(displayError));
            }), takeUntil(_this.destroyed$));
        }));
    }
    AuthEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], AuthEffects.prototype, "addUser$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], AuthEffects.prototype, "verifyAgent$", void 0);
    AuthEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions, AuthService])
    ], AuthEffects);
    return AuthEffects;
}());
export { AuthEffects };
//# sourceMappingURL=auth.effects.js.map