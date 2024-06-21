import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { ApplicationService } from './application.service';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { commonEnv } from 'environments/environment.common';
import { DisplayErrorMessage, LoadApplicantInfo } from 'app/store/actions';
import { applicantInfoSelectors } from 'app/store/selectors';
import { takeUntil, tap } from 'rxjs/operators';
import { ApplicationStatusObject, routeList } from 'app/shared/models';
/**
 * Application Component
 *
 * Parent component of all form components
 */
var ApplicationComponent = /** @class */ (function () {
    function ApplicationComponent(applicationService, store, authService, route, router) {
        this.applicationService = applicationService;
        this.store = store;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.destroyed$ = new Subject();
        this.applicationStatusObject = ApplicationStatusObject;
    }
    ApplicationComponent.prototype.ngOnInit = function () {
        this.selectApplicantInfo();
    };
    /**
     * load applicant data depend on user type
     */
    ApplicationComponent.prototype.loadData = function () {
        var appId = this.route.snapshot.queryParams.appId;
        if (this.authService.getUserInfo().tfp === commonEnv.agentSignInPolicy) {
            this.store.dispatch(new LoadApplicantInfo(appId));
        }
        else {
            this.store.dispatch(new LoadApplicantInfo());
        }
    };
    /**
     * select the userInfo from the store and sets them into variables
     */
    ApplicationComponent.prototype.selectApplicantInfo = function () {
        var _this = this;
        combineLatest(this.store.select(applicantInfoSelectors.selectCurrentAppInfo), this.store.select(applicantInfoSelectors.selectError), this.store.select(applicantInfoSelectors.selectLoading))
            .pipe(takeUntil(this.destroyed$), tap(function (_a) {
            var applicantInfo = _a[0], applicantError = _a[1], applicantLoading = _a[2];
            _this.loading = applicantLoading;
            if (applicantInfo) {
                _this.loadingError = false;
                if (applicantInfo.lastStep) {
                    // set the last step completed from the db information
                    _this.applicationService.lastStep = applicantInfo.lastStep;
                }
                else {
                    _this.applicationService.lastStep = 0;
                }
                if (applicantInfo.status) {
                    _this.applicationService.status = applicantInfo.status;
                }
                _this.applicationService.isLastStep = true;
                // TODO: Remove logic from here and implement it in the application guard for children.
                // This will eliminate the need for the if conditions
                if (!applicantLoading &&
                    !_this.router.url.match("/" + commonEnv.azureAgentCallbackUrl + "/") &&
                    applicantInfo.status !==
                        (_this.applicationStatusObject.paid.value ||
                            _this.applicationStatusObject.complete.value)) {
                    // set the landing route based on the last step completed
                    _this.applicationService.setLandingRoute();
                }
                else {
                    _this.router.navigateByUrl(routeList.application.path + "/" + routeList.application.children.review);
                }
            }
            else if (applicantError) {
                _this.loadingError = true;
                _this.store.dispatch(new DisplayErrorMessage({
                    error: applicantError,
                    callback: function () {
                        _this.loadData();
                    }
                }));
            }
            else if (!applicantInfo && !applicantLoading) {
                _this.loadData();
            }
        }))
            .subscribe();
    };
    ApplicationComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    ApplicationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-application',
            templateUrl: './application.component.html',
            styleUrls: ['./application.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ApplicationService,
            Store,
            AuthService,
            ActivatedRoute,
            Router])
    ], ApplicationComponent);
    return ApplicationComponent;
}());
export { ApplicationComponent };
//# sourceMappingURL=application.component.js.map