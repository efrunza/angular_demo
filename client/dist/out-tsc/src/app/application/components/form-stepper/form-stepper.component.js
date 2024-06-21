import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationService } from 'app/application/application.service';
import { ApplicationStatusObject, EUserType, routeList } from 'app/shared/models';
import { AuthService } from 'app/auth/auth.service';
import { commonEnv } from 'environments/environment.common';
/**
 * Form Stepper Component, main component for controlling navigation between pages by stepper
 */
var FormStepperComponent = /** @class */ (function () {
    function FormStepperComponent(router, applicationService, authService) {
        this.router = router;
        this.applicationService = applicationService;
        this.authService = authService;
        /**
         *  let observable know when to unsubscribe, will be marked as completed whenever the form is destroyed
         */
        this.destroyed$ = new Subject();
        this.routeList = routeList;
        /**
         * array of step object holding each step's formGroup(defined in individual the step components), route and title
         */
        this.steps = [
            {
                formGroup: this.formComponent
                    ? this.formComponent.personalInfoForm
                    : null,
                formRoute: '/application/personal-info',
                title: 'Personal Information'
            },
            {
                formGroup: this.formComponent
                    ? this.formComponent.programAvailabilityForm
                    : null,
                formRoute: '/application/program-availability',
                title: 'Program Availability'
            },
            {
                formGroup: this.formComponent ? this.formComponent.eliOptionsForm : null,
                formRoute: '/application/english-proficiency',
                title: 'English Proficiency'
            },
            {
                formGroup: this.formComponent
                    ? this.formComponent.programChoiceForm
                    : null,
                formRoute: '/application/program-choice',
                title: 'Program Choice'
            },
            {
                formGroup: this.formComponent ? this.formComponent.academicForm : null,
                formRoute: '/application/academic-info',
                title: 'Academic Information'
            },
            {
                formGroup: this.formComponent ? this.formComponent.fileuploadForm : null,
                formRoute: '/application/file-up',
                title: 'Document Upload'
            },
            {
                formGroup: this.formComponent ? this.formComponent.infoReleaseForm : null,
                formRoute: '/application/info-release',
                title: 'Information Release'
            },
            {
                formGroup: this.formComponent
                    ? this.formComponent.reviewSubmitForm
                    : null,
                formRoute: '/application/review-submit',
                title: 'Review Application'
            },
            {
                formGroup: this.formComponent ? this.formComponent.paymentForm : null,
                formRoute: '/application/payment',
                title: 'Payment & Submission'
            }
        ];
        this.applicationStatusObject = ApplicationStatusObject;
        this.applicationStatus = ApplicationStatusObject.unknown.text;
        this.setUserInfo();
        if (this.userType === EUserType.Agent) {
            this.steps[0].title = 'Applicant Information';
        }
        if (applicationService.status) {
            this.applicationStatus = applicationService.status;
        }
    }
    Object.defineProperty(FormStepperComponent.prototype, "formComponent", {
        set: function (value) {
            this._formComponent = value;
        },
        enumerable: true,
        configurable: true
    });
    FormStepperComponent.prototype.ngOnInit = function () {
        this.setStepByUrl(true);
    };
    /**
     * depend on the policy to set userType
     */
    FormStepperComponent.prototype.setUserInfo = function () {
        this.userType =
            this.authService.getUserInfo().tfp === commonEnv.applicantSignInPolicy
                ? EUserType.Applicant
                : EUserType.Agent;
    };
    FormStepperComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // subscribe to router events and set the stepper steps on url change
        this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                // If condition is here to prevent setting the step after going from application to agent page
                if (event.urlAfterRedirects.match("^/application/")) {
                    setTimeout(function () {
                        _this.setStepByUrl();
                    });
                }
            }
        });
    };
    /**
     * subscribe to the selection change event of mat-horizontal-stepper and set the url accordingly
     * @param event selection change event
     */
    FormStepperComponent.prototype.selectionChanged = function (event) {
        this.selectedStepIndex = event.selectedIndex;
        var step = this.steps[event.selectedIndex];
        this.router.navigateByUrl(step.formRoute);
    };
    /**
     * sets each step as 'completed' based on the last registered step in the form-stepper, works in conjunction with shared.effects.ts and the application.service.ts
     * @param stepIndex index of the step
     */
    FormStepperComponent.prototype.isComplete = function (stepIndex) {
        var stepNumber = stepIndex + 1;
        return this.applicationService.lastStep >= stepNumber;
    };
    /**
     * set the active step of mat-stepper based on the active browser url
     * @param onInit flag to know whether it is the initial stage
     */
    FormStepperComponent.prototype.setStepByUrl = function (onInit) {
        if (onInit === void 0) { onInit = false; }
        var urlTree = this.router.parseUrl(this.router.url);
        var urlWithoutParams = urlTree.root.children['primary'].segments
            .map(function (it) { return it.path; })
            .join('/');
        var targetStepIndex = this.steps.findIndex(function (step) {
            return !!step.formRoute.match(urlWithoutParams);
        });
        if (onInit) {
            // if condition prevents redirect issues.
            // could be removed after a ngIf for valid application form routes on the form-stepper selector
            if (targetStepIndex >= 0) {
                this.selectedStepIndex = targetStepIndex;
            }
        }
        else {
            this.selectedStepIndex = targetStepIndex;
        }
    };
    FormStepperComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild('_formComponent'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], FormStepperComponent.prototype, "formComponent", null);
    tslib_1.__decorate([
        ViewChild('stepper'),
        tslib_1.__metadata("design:type", MatStepper)
    ], FormStepperComponent.prototype, "stepper", void 0);
    FormStepperComponent = tslib_1.__decorate([
        Component({
            selector: 'app-form-stepper',
            templateUrl: './form-stepper.component.html',
            styleUrls: ['./form-stepper.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ApplicationService,
            AuthService])
    ], FormStepperComponent);
    return FormStepperComponent;
}());
export { FormStepperComponent };
//# sourceMappingURL=form-stepper.component.js.map