import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
var AuthService = /** @class */ (function () {
    function AuthService(msalService, http) {
        var _this = this;
        this.msalService = msalService;
        this.http = http;
        this.acquireToken = function () {
            return _this.msalService.acquireTokenSilent(environment.scopes);
        };
        this.isAuthenticated = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, !!this.getUserInfo()];
            });
        }); };
        this.login = function () {
            return _this.msalService.loginRedirect(environment.scopes);
        };
        this.logout = function () {
            localStorage.removeItem('firstLogInDone');
            return _this.msalService.logout();
        };
        this.getUserInfo = function () {
            var userData = _this.msalService.getUser();
            return userData ? userData.idToken : null;
        };
        this.verifyAgent = function () {
            return _this.http.get(environment.apiUrl + "/verifyAgent");
        };
        // TODO: the current get cache access token implemented by MS does not work, remove this func in the future
        this.getCacheAccessToken = function () {
            var key = {
                authority: _this.msalService.authority,
                clientId: environment.clientId,
                scopes: environment.scopes[0],
                userIdentifier: _this.msalService.getUser().userIdentifier
            };
            var storageValue = sessionStorage.getItem(JSON.stringify(key));
            return storageValue ? JSON.parse(storageValue) : null;
        };
    }
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [MsalService, HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map