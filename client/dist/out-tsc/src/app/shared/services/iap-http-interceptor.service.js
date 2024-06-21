import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { first, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { applicantInfoSelectors, userSelectors } from 'app/store/selectors';
import { environment } from 'environments/environment';
import { fromPromise } from 'rxjs-compat/observable/fromPromise';
var IapHttpInterceptorService = /** @class */ (function () {
    function IapHttpInterceptorService(authService, store) {
        this.authService = authService;
        this.store = store;
        this.appId = null;
    }
    IapHttpInterceptorService.prototype.handleAccess = function (request, next, agentId, appId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headerSettings, token;
            return tslib_1.__generator(this, function (_a) {
                headerSettings = {};
                /*
                // try to get the cache token before actually use the iFrame to request a new token
                // check for token expiry
                if (
                  this.authService.getCacheAccessToken() &&
                  Number(this.authService.getCacheAccessToken().expiresIn) >
                    Math.floor(Date.now() / 1000)
                ) {
                  token = this.authService.getCacheAccessToken().accessToken;
                } else {
                  token = await this.authService.acquireToken();
                }
            
                */
                // assign token to Authorization header
                if (token) {
                    headerSettings['Authorization'] = 'Bearer ' + token;
                }
                // NOTE: this is not used anywhere, should be removed?
                if (environment.apiSubscriptionEnabled) {
                    headerSettings['Ocp-Apim-Subscription-Key'] =
                        environment.apiSubscriptionKey;
                }
                // some API need appId in the header to work properly
                if (appId) {
                    headerSettings['appId'] = appId;
                }
                // some API need agentId in the header to work properly
                if (agentId) {
                    headerSettings['agentId'] = agentId;
                }
                return [2 /*return*/, next
                        .handle(request.clone({
                        setHeaders: headerSettings
                    }))
                        .toPromise()];
            });
        });
    };
    IapHttpInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        // try to get specific data from the store and send them in the request header
        return this.store.select(userSelectors.selectAgentId).pipe(withLatestFrom(this.store.select(applicantInfoSelectors.selectApplicationID)), first(), switchMap(function (_a) {
            var agentId = _a[0], appId = _a[1];
            return fromPromise(_this.handleAccess(req, next, agentId, appId));
        }));
    };
    IapHttpInterceptorService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            Store])
    ], IapHttpInterceptorService);
    return IapHttpInterceptorService;
}());
export { IapHttpInterceptorService };
//# sourceMappingURL=iap-http-interceptor.service.js.map