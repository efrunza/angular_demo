import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { commonEnv } from 'environments/environment.common';
import { routeList } from 'app/shared/models';
var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        // holding displayed user name (declared while creating an account)
        this.displayedName = null;
        // specifies the user type
        this.userType = null;
        // specifies the redirect button text
        this.buttonText = null;
        this.getUserType = function () {
            var userInfo = _this.authService.getUserInfo();
            if (userInfo && userInfo.tfp === commonEnv.agentSignInPolicy) {
                _this.userType = 'agent';
                _this.buttonText = 'Return to agent Dashboard';
                _this.loading = false;
            }
            else if (userInfo && userInfo.tfp === commonEnv.applicantSignInPolicy) {
                _this.userType = 'applicant';
                _this.buttonText = 'Return to application';
                _this.loading = false;
            }
            else {
                _this.loading = false;
                // TODO: add error message here
            }
        };
        this.redirect = function () {
            if (_this.userType === 'applicant') {
                _this.router.navigateByUrl("/" + routeList.application.path);
            }
        };
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.getUserType();
    };
    PageNotFoundComponent = tslib_1.__decorate([
        Component({
            selector: 'app-page-not-found',
            templateUrl: './page-not-found.component.html',
            styleUrls: ['./page-not-found.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
export { PageNotFoundComponent };
//# sourceMappingURL=page-not-found.component.js.map