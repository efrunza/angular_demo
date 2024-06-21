import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { LoadApplicantInfo } from 'app/store/actions';
import { routeList } from 'app/shared/models';
import { AuthService } from 'app/auth/auth.service';
import { commonEnv } from '../../environments/environment.common';
var ApplicationService = /** @class */ (function () {
    function ApplicationService(store, authService, route, router) {
        this.store = store;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.destroyed$ = new Subject();
        this.status = null;
    }
    ApplicationService.prototype.getLastStep = function () {
        return Observable.of(this.lastStep);
    };
    ApplicationService.prototype.toggleComplete = function (completedStepName) {
        var _this = this;
        var foundCurrentRoute = false;
        var completedStep = 0;
        var targetUrl = Object.values(routeList.application.children).find(function (route, index) {
            if (foundCurrentRoute) {
                return true;
            }
            else if (route.match(completedStepName)) {
                if (completedStepName.match(routeList.application.children.personalInfo)) {
                    // only for the first time when the application is being created,
                    // we need to reload the applicant info by calling the API to get the application ID created in the backend
                    if (_this.authService.getUserInfo().tfp ===
                        commonEnv.applicantSignInPolicy) {
                        _this.store.dispatch(new LoadApplicantInfo());
                    }
                }
                completedStep = index + 1;
                foundCurrentRoute = true;
            }
            return false;
        });
        // setting the current last step completed whenever a form page success action is called in the shared.effects.ts
        // This condition is very important because we don't wean't to change the last step again if the user is updating a page
        if (completedStep > 0) {
            if (completedStep > this.lastStep) {
                this.lastStep = completedStep;
            }
            if (completedStep === 9) {
                this.router.navigateByUrl("/" + routeList.complete);
            }
            else {
                this.router.navigateByUrl("/" + routeList.application.path + "/" + targetUrl);
            }
        }
    };
    /**
     * get the route for the last step the user has completed
     */
    ApplicationService.prototype.getLastStepRoute = function () {
        var _this = this;
        return ('/' +
            routeList.application.path +
            '/' +
            Object.values(routeList.application.children).find(function (route, index) {
                return index === _this.lastStep;
            }));
    };
    /**
     * set the landing page based on the state of the form
     */
    ApplicationService.prototype.setLandingRoute = function () {
        var _this = this;
        var urlTree = this.router.parseUrl(this.router.url);
        var landingUrl = urlTree.root.children['primary'].segments
            .map(function (segments) { return segments.path; })
            .join('/');
        // getting the target page by matching url segments with the application children routes model
        var targetPage = urlTree.root.children['primary'].segments
            .map(function (segments) {
            return Object.values(routeList.application.children).find(function (route) {
                return !!segments.path.match(route);
            });
        })
            .find(function (pathArray) { return !!pathArray; });
        var validTargetPage = Object.values(routeList.application.children).find(function (route, index) {
            return route.match(targetPage) && _this.lastStep >= index + 1;
        });
        // handle the payment redirection from the third party payment page that sends back parameters
        // in this case we do NOT want to redirect the url
        if ((landingUrl.match("/" + routeList.application.children.payment + "?") &&
            this.lastStep >= 7) ||
            landingUrl.match("/" + routeList.complete + "?")) {
            // return from payment
            return;
        }
        else if (!validTargetPage) {
            this.router.navigate([this.getLastStepRoute()]);
        }
        // only redirect the logged in users when they are NOT refreshing their current form page
        else if (localStorage.getItem('firstLogInDone')) {
            if (landingUrl.match("^/" + routeList.application.path + "$") ||
                landingUrl.match("^" + routeList.application.path + "$")) {
                this.router.navigate([this.getLastStepRoute()]);
            }
        }
        else {
            // Set a key in local storage to see if this is the first time the user has logged in
            localStorage.setItem('firstLogInDone', 'true');
            // Move the user to the last Step they have completed using the API that keeps track of the steps
            // We do not want this behavior to happen after they have logged in and try to refresh the page
            this.router.navigate([this.getLastStepRoute()]);
        }
    };
    ApplicationService.prototype.ngOnDestroy = function () { };
    ApplicationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Store,
            AuthService,
            ActivatedRoute,
            Router])
    ], ApplicationService);
    return ApplicationService;
}());
export { ApplicationService };
//# sourceMappingURL=application.service.js.map