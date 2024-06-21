import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { commonEnv } from 'environments/environment.common';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { EMsalItemType, EMSALStatus } from 'shared/models';
import { environment } from '../environments/environment';
import { DisplayErrorDialog } from 'app/store/actions';
var AppComponent = /** @class */ (function () {
    function AppComponent(appService, msalService, authService, store, router, broadcastService) {
        var _this = this;
        this.appService = appService;
        this.msalService = msalService;
        this.authService = authService;
        this.store = store;
        this.router = router;
        this.broadcastService = broadcastService;
        this.title = 'iap-web';
        this.loginFailure$ = null;
        this.acquireTokenFailure$ = null;
        this.isInvalidLoginAttempt = false;
        this.handleLoginFailure = function (payload) {
            var errorDesc = payload.errorDesc;
            if (errorDesc && errorDesc.indexOf(EMSALStatus.FORGOT_PASSWORD) !== -1) {
                _this.msalService.authority = environment.azureInstance + "/" + environment.tenant + "/" + commonEnv.resetPasswordPolicy;
                _this.msalService.loginRedirect();
            }
            else if (errorDesc &&
                errorDesc.indexOf(EMSALStatus.CANCEL_RESET_PASSWORD) !== -1) {
                _this.msalService.authority = environment.azureInstance + "/" + environment.tenant + "/" + commonEnv.applicantSignInPolicy;
                _this.authService.login();
            }
            else if (errorDesc &&
                errorDesc.indexOf(EMSALStatus.MULTIPLE_ACCOUNTS) !== -1) {
                _this.msalService.authority = environment.azureInstance + "/" + environment.tenant + "/" + commonEnv.applicantSignInPolicy;
                _this.authService.login();
            }
            else {
                _this.store.dispatch(new DisplayErrorDialog({
                    message: errorDesc,
                    action: _this.authService.logout
                }));
            }
        };
        // TODO: handle specific error with a friendly error message
        this.handleAcquiredTokenFailure = function (payload) {
            var error = payload.error;
            if (error && error.indexOf(EMSALStatus.SESSION_TIME_OUT) !== -1) {
                _this.store.dispatch(new DisplayErrorDialog({
                    message: 'Session time out, please login again..',
                    action: _this.authService.logout
                }));
            }
            else if (error && error.indexOf(EMSALStatus.MULTIPLE_ACCOUNTS) !== -1) {
                _this.store.dispatch(new DisplayErrorDialog({
                    message: 'Multiple Microsoft accounts detected, make sure you logged out other accounts before logging in',
                    action: _this.authService.logout
                }));
            }
            else {
                _this.store.dispatch(new DisplayErrorDialog({
                    message: payload.errorDesc,
                    action: _this.authService.logout
                }));
            }
        };
        this.loginFailure$ = this.broadcastService.subscribe(EMsalItemType.LOGIN_FAILURE, function (payload) {
            _this.isInvalidLoginAttempt = true;
            _this.handleLoginFailure(payload);
        });
        this.acquireTokenFailure$ = this.broadcastService.subscribe(EMsalItemType.ACQUIRE_TOKEN_FAILURE, function (payload) {
            _this.isInvalidLoginAttempt = true;
            _this.handleAcquiredTokenFailure(payload);
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadingText = this.appService.setLoadingText();
        this.displayedName = "Eugen Frunza";
        var userInfo = { "firstName": "Eugen", "lastName": "Frunza", "emails": "[\"efrunza@hotmail.com\"]" };
        /*
        if (!this.msalService.loginInProgress()) {
          const userInfo = this.authService.getUserInfo();
          if (userInfo) {
            this.appService.selectUserInfo();
            this.appService.watchUserError();
            // setting the username for application header
            this.displayedName = userInfo.name;
    
            if (userInfo.tfp === commonEnv.applicantSignInPolicy) {
              this.store.dispatch(new AddNewUser());
            } else if (userInfo.tfp === commonEnv.agentSignInPolicy) {
              this.store.dispatch(new VerifyAgent());
            }
          }
        }
        */
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.broadcastService.getMSALSubject().next(1);
        if (this.loginFailure$) {
            this.loginFailure$.unsubscribe();
        }
        if (this.acquireTokenFailure$) {
            this.acquireTokenFailure$.unsubscribe();
        }
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AppService,
            MsalService,
            AuthService,
            Store,
            Router,
            BroadcastService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map