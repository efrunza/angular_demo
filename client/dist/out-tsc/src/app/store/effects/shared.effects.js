import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationService } from 'app/application/application.service';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { EErrorType, ESnackbarAction, routeList } from 'shared/models';
import { CloseErrorMessageOnRouteChange, EAcademicInfoActions, EEnglishProficiencyActions, EInfoReleaseActions, EMessageActions, EPaymentActions, EPersonalInfoActions, EProgramChoiceActions, EProgramListActions, EReviewSubmitActions, EUploadActions } from '../actions';
import { ErrorDialogComponent } from 'shared/components/error-dialog/error-dialog.component';
var SharedEffects = /** @class */ (function () {
    function SharedEffects(actions$, router, snackBar, applicationService, ngZone, dialog) {
        var _this = this;
        this.actions$ = actions$;
        this.router = router;
        this.snackBar = snackBar;
        this.applicationService = applicationService;
        this.ngZone = ngZone;
        this.dialog = dialog;
        this.snackbarRef = null;
        this.destroyed$ = new Subject();
        this.navigateAfterSubmit$ = this.actions$.pipe(takeUntil(this.destroyed$), ofType(EPaymentActions.PAYMENT_SUCCESS, EReviewSubmitActions.VIEW_REVIEW_SUBMIT_SUCCESS, EInfoReleaseActions.SUBMIT_INFO_RELEASE_SUCCESS, EUploadActions.SAVE_TO_STORE, EAcademicInfoActions.SUBMIT_ACADEMIC_INFO_SUCCESS, EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES_SUCCESS, EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY_SUCCESS, EProgramListActions.VIEW_PROGRAM_LIST_SUCCESS, EPersonalInfoActions.SUBMIT_PERSONAL_INFO_SUCCESS, EPaymentActions.CHECK_PROMO_CODE_SUCCESS), tap(function (action) {
            var completedStepName;
            switch (action.type) {
                case EPersonalInfoActions.SUBMIT_PERSONAL_INFO_SUCCESS:
                    completedStepName = "" + routeList.application.children.personalInfo;
                    break;
                case EProgramListActions.VIEW_PROGRAM_LIST_SUCCESS:
                    completedStepName = "" + routeList.application.children.programList;
                    break;
                case EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY_SUCCESS:
                    completedStepName = "" + routeList.application.children.englishProf;
                    break;
                case EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES_SUCCESS:
                    completedStepName = "" + routeList.application.children.programChoice;
                    break;
                case EAcademicInfoActions.SUBMIT_ACADEMIC_INFO_SUCCESS:
                    completedStepName = "" + routeList.application.children.academicInfo;
                    break;
                case EUploadActions.SAVE_TO_STORE:
                    completedStepName = "" + routeList.application.children.documentUpload;
                    break;
                case EInfoReleaseActions.SUBMIT_INFO_RELEASE_SUCCESS:
                    completedStepName = "" + routeList.application.children.infoRelease;
                    break;
                case EReviewSubmitActions.VIEW_REVIEW_SUBMIT_SUCCESS:
                    completedStepName = "" + routeList.application.children.review;
                    break;
                case EPaymentActions.PAYMENT_SUCCESS:
                    completedStepName = "" + routeList.application.children.payment;
                    break;
                case EPaymentActions.CHECK_PROMO_CODE_SUCCESS:
                    completedStepName = "" + routeList.application.children.payment;
                    break;
                default:
                    break;
            }
            _this.applicationService.toggleComplete(completedStepName);
            if (action.type !== EReviewSubmitActions.VIEW_REVIEW_SUBMIT_SUCCESS &&
                action.type !== EPaymentActions.PAYMENT_SUCCESS &&
                _this.applicationService.lastStep >= 8) {
                _this.applicationService.lastStep = 7;
            }
        }));
        this.openSnackbarError$ = this.actions$.pipe(ofType(EMessageActions.DISPLAY_ERROR_MESSAGE), tap(function (messageAction) {
            var _a = messageAction.payload, error = _a.error, callback = _a.callback, messageFactory = _a.messageFactory, actionName = _a.actionName;
            var type = error.type;
            var message = messageFactory ? messageFactory(error) : error.message;
            var action;
            action = actionName
                ? actionName
                : type === EErrorType.LOAD
                    ? ESnackbarAction.REFRESH
                    : ESnackbarAction.DISMISS;
            _this.ngZone.run(function () {
                _this.snackbarRef = _this.snackBar.open(message, action, {
                    duration: action === ESnackbarAction.REFRESH ? null : 15000,
                    panelClass: 'error-snackbar'
                });
                // this action will be fired whenever the action button is clicked
                _this.snackbarRef.onAction().subscribe(function () {
                    // close the snackbar and do whatever callback is passed
                    if (callback) {
                        callback();
                    }
                });
            });
        }), takeUntil(this.destroyed$));
        this.closeSnackbarOnRouteChange$ = this.actions$.pipe(ofType(EMessageActions.CLOSE_ERROR_MESSAGE_ON_ROUTE_CHANGE), tap(function () {
            _this.router.events
                .pipe(filter(function (event) { return event instanceof NavigationEnd; }), takeUntil(_this.destroyed$))
                .subscribe(function (event) {
                _this.snackBar.dismiss();
            });
        }), takeUntil(this.destroyed$));
        this.openErrorDialog = this.actions$.pipe(ofType(EMessageActions.DISPLAY_ERROR_DIALOG), tap(function (action) {
            _this.ngZone.run(function () {
                _this.dialogRef = _this.dialog.open(ErrorDialogComponent, {
                    data: action.payload,
                    closeOnNavigation: false,
                    disableClose: true
                });
            });
        }), takeUntil(this.destroyed$));
    }
    SharedEffects.prototype.ngrxOnInitEffects = function () {
        return new CloseErrorMessageOnRouteChange();
    };
    SharedEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Observable)
    ], SharedEffects.prototype, "navigateAfterSubmit$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Observable)
    ], SharedEffects.prototype, "openSnackbarError$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Observable)
    ], SharedEffects.prototype, "closeSnackbarOnRouteChange$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Observable)
    ], SharedEffects.prototype, "openErrorDialog", void 0);
    SharedEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            Router,
            MatSnackBar,
            ApplicationService,
            NgZone,
            MatDialog])
    ], SharedEffects);
    return SharedEffects;
}());
export { SharedEffects };
//# sourceMappingURL=shared.effects.js.map