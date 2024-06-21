import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
var ApplicationGuard = /** @class */ (function () {
    function ApplicationGuard(authService, router) {
        this.authService = authService;
        this.router = router;
        this.userInfo = this.authService.getUserInfo();
    }
    ApplicationGuard.prototype.canActivate = function (route, state) {
        /*
        const currentUrl = this.router.url;
        const targetUrl = state.url;
    
        // TODO: This if statement can be removed after refactoring the way we load agent information and id
        if (this.userInfo) {
          if (
            this.userInfo.tfp === commonEnv.agentSignInPolicy &&
            targetUrl.match(`/${routeList.application.path}`) &&
            !currentUrl.match(`/${routeList.agent.path}`) &&
            !route.queryParams['appId']
          ) {
            this.router.navigateByUrl('/agent');
            return false;
          }
        } else {
          this.router.navigateByUrl('/');
          return false;
        }
        */
        return true;
    };
    ApplicationGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], ApplicationGuard);
    return ApplicationGuard;
}());
export { ApplicationGuard };
//# sourceMappingURL=application.guard.js.map