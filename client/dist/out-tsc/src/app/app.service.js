import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { EErrorType, EExceptionTypes } from 'shared/models';
import { DisplayErrorMessage } from 'app/store/actions';
import { VerifyAgent } from 'app/store/actions/auth.actions';
import { userSelectors } from 'app/store/selectors';
var AppService = /** @class */ (function () {
    function AppService(store) {
        var _this = this;
        this.store = store;
        this.destroyed$ = new Subject();
        this.applicantEmail = null;
        this.setLoadingText = function (userType) {
            var loadingText;
            if (userType && userType === 'agent') {
                loadingText = 'Loading Application Information... Please Wait';
            }
            else if (userType && userType === 'applicant') {
                loadingText = 'Loading Agent Information... Please Wait';
            }
            else {
                loadingText = 'Loading User Information... Please Wait';
            }
            return loadingText;
        };
        this.selectUserInfo = function () {
            combineLatest(_this.store.select(userSelectors.selectUserInfo), _this.store.select(userSelectors.selectLoading))
                .pipe(map(function (_a) {
                var userInfo = _a[0], loadingUserInfo = _a[1];
                _this.loadingUserInfo = loadingUserInfo;
                _this.userInfo = userInfo;
                if (userInfo) {
                    if (!userInfo.agentId) {
                        // If the user is an applicant, use their login email as their email address
                        //this.applicantEmail = userInfo.emails[0];
                    }
                }
            }), takeUntil(_this.destroyed$))
                .subscribe();
        };
        this.watchUserError = function () {
            _this.store
                .select(userSelectors.selectError)
                .pipe(tap(function (error) {
                if (error) {
                    if (error.type === EErrorType.LOAD) {
                        _this.store.dispatch(new DisplayErrorMessage({
                            error: error,
                            callback: function () { return _this.store.dispatch(new VerifyAgent()); },
                            messageFactory: _this.errorMessageFactory
                        }));
                    }
                    else {
                        _this.store.dispatch(new DisplayErrorMessage({ error: error }));
                    }
                }
            }), takeUntil(_this.destroyed$))
                .subscribe();
        };
        this.errorMessageFactory = function (error) {
            if (error) {
                switch (error.id) {
                    case EExceptionTypes.EXPIRED_AGENT:
                        return 'Looks like you are no longer a Seneca Agent, please sign out and try another account';
                    case EExceptionTypes.INVALID_AGENT_LOGIN:
                        return 'Invalid Agent login attempt, please sign in with your Agent account instead.';
                    case EExceptionTypes.UNABLE_TO_VERIFY_AGENT:
                        return 'Something went wrong and we cannot verify your identity, please try again.';
                    default:
                        return 'Something went wrong... Please try again';
                }
            }
        };
    }
    AppService.prototype.ngOnInit = function () {
        this.setLoadingText();
    };
    AppService.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    AppService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], AppService);
    return AppService;
}());
export { AppService };
//# sourceMappingURL=app.service.js.map