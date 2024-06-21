import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { ApplicationStatusObject, routeList } from 'shared/models';
import { Store } from '@ngrx/store';
import { ApplicationService } from 'app/application/application.service';
import { ApplicantInfoService } from '../../services/api/applicant-info.service';
var MainNavComponent = /** @class */ (function () {
    function MainNavComponent(breakpointObserver, authService, router, activatedRoute, store, applicationService, applicantInfoService) {
        var _this = this;
        this.breakpointObserver = breakpointObserver;
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.applicationService = applicationService;
        this.applicantInfoService = applicantInfoService;
        this.destroyed$ = new Subject();
        this.applicationId = null;
        this.applicationStatusObject = ApplicationStatusObject;
        this.isAtHomeScreen = false;
        this.isHandset$ = this.breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(map(function (result) { return result.matches; }), takeUntil(this.destroyed$));
        /*
            this.store
              .select(applicantInfoSelectors.selectCurrentAppInfo)
              .pipe(
                takeUntil(this.destroyed$),
                tap(currentAppInfo => {
                  if (currentAppInfo) {
                    this.applicationId = currentAppInfo.appId;
                    if (currentAppInfo.status) {
                      Object.entries(this.applicationStatusObject).forEach(object => {
                        if (object[1].value === currentAppInfo.status) {
                          this.applicationStatus = object[1].text;
                        }
                      });
                    } else {
                      this.applicationStatus = this.applicationStatusObject.new.text;
                    }
                  }
                })
              )
              .subscribe();
        */
        //}
        this.onHomeClick = function () {
            _this.router.navigateByUrl("/" + routeList.application.path + "/" + routeList.application.children.personalInfo);
            /*
          const user = this.authService.getUserInfo();
          if (user) {
            user.tfp === commonEnv.agentSignInPolicy
              ? this.router.navigateByUrl(`/${routeList.agent.path}`)
              : this.router.navigateByUrl(
                  `/${routeList.application.path}/${routeList.application.children.personalInfo}`
                );
          }
          */
        };
        this.user = this.authService.getUserInfo();
    }
    MainNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.applicantInfoService.getApplicantInfo('56000010012').subscribe(function (currentAppInfo) {
            if (currentAppInfo) {
                _this.applicationId = currentAppInfo.appId;
                if (currentAppInfo.status) {
                    Object.entries(_this.applicationStatusObject).forEach(function (object) {
                        if (object[1].value === currentAppInfo.status) {
                            _this.applicationStatus = object[1].text;
                        }
                    });
                }
                else {
                    _this.applicationStatus = _this.applicationStatusObject.new.text;
                }
            }
        });
    };
    ;
    MainNavComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    MainNavComponent.prototype.onSignOutClick = function () {
        this.authService.logout();
    };
    MainNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-main-nav',
            templateUrl: './main-nav.component.html',
            styleUrls: ['./main-nav.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BreakpointObserver,
            AuthService,
            Router,
            ActivatedRoute,
            Store,
            ApplicationService,
            ApplicantInfoService])
    ], MainNavComponent);
    return MainNavComponent;
}());
export { MainNavComponent };
//# sourceMappingURL=main-nav.component.js.map