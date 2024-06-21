import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { commonEnv } from 'environments/environment.common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { EUserType, routeList } from 'app/shared/models';
var CompleteComponent = /** @class */ (function () {
    function CompleteComponent(authService, activatedRoute, router) {
        var _this = this;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.userTypeEnum = EUserType;
        this.setUserInfo = function () {
            if (_this.authService.getUserInfo().tfp === commonEnv.applicantSignInPolicy) {
                _this.userType = EUserType.Applicant;
            }
            else if (_this.authService.getUserInfo().tfp === commonEnv.agentSignInPolicy) {
                _this.userType = EUserType.Agent;
            }
            _this.appId = _this.activatedRoute.snapshot.queryParams.appId;
        };
        this.isApplicant = function () {
            return _this.authService.getUserInfo().tfp === commonEnv.applicantSignInPolicy;
        };
        this.setUserInfo();
    }
    CompleteComponent.prototype.ngOnInit = function () { };
    CompleteComponent.prototype.onClose = function () {
        this.authService.logout();
    };
    CompleteComponent.prototype.onBack = function () {
        if (this.userType === EUserType.Applicant) {
            this.router.navigate([
                "/" + routeList.application.path + "/" + routeList.application.children.review
            ]);
        }
    };
    CompleteComponent = tslib_1.__decorate([
        Component({
            selector: 'app-complete',
            templateUrl: './complete.component.html',
            styleUrls: ['./complete.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            ActivatedRoute,
            Router])
    ], CompleteComponent);
    return CompleteComponent;
}());
export { CompleteComponent };
//# sourceMappingURL=complete.component.js.map