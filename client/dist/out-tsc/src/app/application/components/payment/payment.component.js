import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CheckPromoCode, DisplayErrorMessage, GetApplicationFee, LoadApplicantInfo, PaymentSuccess, UpdatePaymentResponse } from 'app/store/actions';
import { AppSubmitError } from 'shared/models';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { applicantInfoSelectors, paymentSelectors } from 'app/store/selectors';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { environment } from 'environments/environment';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
/**
 * Payment Component, main component for payment data
 */
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(store, activatedRoute, authService, dialog, router) {
        this.store = store;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.dialog = dialog;
        this.router = router;
        this.destroyed$ = new Subject();
        /**
         * state data needs to be accessed outside ngOnInit() so is copied to a local variable
         */
        this.paymentData = {
            id: null,
            applicationFee: null,
            error: null,
            loading: false,
            paymentResponse: null,
            paid: false,
            idError: null,
            idLoading: null,
            promoValid: false,
            promoError: null,
            promoFormError: null,
            checkingPromoCode: false
        };
        this.showError = false;
        /**
         * these variables needed to prevent multiple API calls in place of 1 in subscribeToStore()
         */
        this.idLoadedOnce = false;
        this.feeLoadedOnce = false;
    }
    /**
     *  initializes Form and Subscribes to changes in the Store
     */
    PaymentComponent.prototype.ngOnInit = function () {
        var queryUrl = new URLSearchParams(this.activatedRoute.snapshot.queryParams);
        // needed for Payment response through query params
        var paymentResponse = {
            totalCharge: queryUrl.get('totalcharge'),
            responseCode: queryUrl.get('responsecode'),
            transactionStatus: queryUrl.get('transactionstatus'),
            orderId: queryUrl.get('orderid'),
            appId: queryUrl.get('appId')
        };
        // update the payment response if appId and transaction status exist
        if (paymentResponse.appId && paymentResponse.transactionStatus) {
            this.store.dispatch(new UpdatePaymentResponse(paymentResponse));
        }
        // initialize Form
        this.paymentForm = new FormGroup({
            promoCode: new FormControl(null)
        });
        // subscribe to store
        this.subscribeToStore();
    };
    /**
     * Selects the State for the Payment page and subscribes to its changes
     */
    PaymentComponent.prototype.subscribeToStore = function () {
        var _this = this;
        combineLatest(this.store.select(paymentSelectors.selectLoading), this.store.select(paymentSelectors.selectError), this.store.select(paymentSelectors.selectPaymentResponse), this.store.select(paymentSelectors.selectPaid), this.store.select(paymentSelectors.selectLatest), this.store.select(applicantInfoSelectors.selectApplicationID), this.store.select(applicantInfoSelectors.selectError), this.store.select(applicantInfoSelectors.selectLoading), this.store.select(paymentSelectors.selectPromoValid), this.store.select(paymentSelectors.selectPromoError), this.store.select(paymentSelectors.selectPromoFormError), this.store.select(paymentSelectors.selectCheckingPromoCode))
            .pipe(takeUntil(this.destroyed$), map(function (_a) {
            var loading = _a[0], error = _a[1], paymentResponse = _a[2], paid = _a[3], data = _a[4], id = _a[5], idError = _a[6], idLoading = _a[7], promoValid = _a[8], promoError = _a[9], promoFormError = _a[10], checkingPromoCode = _a[11];
            if (data) {
                return {
                    loading: loading,
                    error: error,
                    paymentResponse: paymentResponse,
                    paid: paid,
                    id: id,
                    applicationFee: data.applicationFee,
                    idError: idError,
                    idLoading: idLoading,
                    promoValid: promoValid,
                    promoError: promoError,
                    promoFormError: promoFormError,
                    checkingPromoCode: checkingPromoCode
                };
            }
            else {
                return {
                    loading: loading,
                    error: error,
                    paymentResponse: paymentResponse,
                    paid: paid,
                    id: id,
                    applicationFee: null,
                    idError: idError,
                    idLoading: idLoading,
                    promoValid: promoValid,
                    promoError: promoError,
                    promoFormError: promoFormError,
                    checkingPromoCode: checkingPromoCode
                };
            }
        }))
            .subscribe(function (val) {
            // paymentData variable copies from the store so it can be accessed outside this function
            _this.paymentData = val;
            var unpaid = false;
            // if (this.paymentData.paid) {
            //   //console.log('INSIDE IF - this.paymentData.paid');
            //   // prevents double paying (if previously paid, redirects to complete page)
            //   this.store.dispatch(new PaymentSuccess());
            //   // re-direct to /complete page
            //   //this.router.navigateByUrl(`/${routeList.complete}`);
            // }
            // TODO: This logic has been moved to the back-end but we need to handle the dispatch and errors differently before removing these lines
            // make sure this is the final solution first before refactoring
            if (_this.paymentData.paymentResponse) {
                if (_this.paymentData.paymentResponse.transactionStatus &&
                    _this.paymentData.paymentResponse.transactionStatus !== 'APPROVED' &&
                    _this.paymentData.paymentResponse.transactionStatus !== 'A' //TODO: Currently API sends 'A' instead of 'APPROVED,' remove if/when fixed
                ) {
                    _this.showError = true;
                    unpaid = true;
                }
                else {
                    _this.store.dispatch(new PaymentSuccess());
                }
            }
            else {
                unpaid = true;
            }
            if (unpaid) {
                if (!val.error &&
                    !val.idError &&
                    !val.promoError &&
                    !val.promoFormError) {
                    _this.fillStoreIfEmpty();
                }
                else {
                    _this.showErrors();
                }
                // if (this.paymentData.promoValid) {
                //   this.store.dispatch(new PaymentSuccess());
                //   // re-direct to /complete page
                //   //this.router.navigateByUrl(`/${routeList.complete}`);
                // }
            }
        });
    };
    /**
     * if Application Id or Application Fee is not in the store, load it
     */
    PaymentComponent.prototype.fillStoreIfEmpty = function () {
        if (
        // load data into store if not loaded already (more useful in development)
        !this.paymentData.id ||
            !this.paymentData.applicationFee) {
            if (!this.paymentData.id) {
                if (!this.paymentData.idLoading &&
                    !this.paymentData.idError &&
                    !this.idLoadedOnce) {
                    this.store.dispatch(new LoadApplicantInfo());
                    this.idLoadedOnce = true;
                }
            }
            else if (!this.paymentData.applicationFee) {
                if (!this.paymentData.loading &&
                    !this.paymentData.error &&
                    !this.feeLoadedOnce) {
                    this.store.dispatch(new GetApplicationFee(this.paymentData.id));
                    this.feeLoadedOnce = true;
                }
            }
        }
    };
    /**
     * shows any errors with the appropriate action
     */
    PaymentComponent.prototype.showErrors = function () {
        var _this = this;
        if (this.paymentData.idError && !this.paymentData.idLoading) {
            this.store.dispatch(new DisplayErrorMessage({
                error: this.paymentData.idError,
                callback: function () {
                    _this.store.dispatch(new LoadApplicantInfo());
                }
            }));
        }
        else if (this.paymentData.error && !this.paymentData.loading) {
            this.store.dispatch(new DisplayErrorMessage({
                error: this.paymentData.error,
                callback: function () {
                    _this.store.dispatch(new GetApplicationFee(_this.paymentData.id));
                }
            }));
        }
        else if (this.paymentData.promoError &&
            !this.paymentData.checkingPromoCode) {
            this.store.dispatch(new DisplayErrorMessage({
                error: this.paymentData.promoError
            }));
        }
        else if (this.paymentData.promoFormError) {
            var promoFormErrorMessage = new AppSubmitError(null, this.paymentData.promoFormError.message);
            this.store.dispatch(new DisplayErrorMessage({
                error: promoFormErrorMessage
            }));
        }
    };
    /**
     * validates the Promo Code if any, otherwise Submits to Moneris
     * @param event button event
     */
    PaymentComponent.prototype.onSubmit = function (event) {
        if (!(this.paymentData.error ||
            this.paymentData.idError ||
            this.paymentForm.controls['promoCode'].errors)) {
            if (this.paymentForm.value.promoCode !== null &&
                this.paymentForm.value.promoCode.trim() !== '' &&
                !this.paymentData.promoValid) {
                event.preventDefault();
                var newPromoCode = {
                    applicationId: this.paymentData.id,
                    promoCode: this.paymentForm.value.promoCode
                };
                this.store.dispatch(new CheckPromoCode(newPromoCode));
            }
            else {
                this.submitToMoneris();
            }
        }
        else {
            if (this.paymentForm.controls['promoCode'].errors) {
                this.store.dispatch(new DisplayErrorMessage({
                    error: new AppSubmitError(null, 'Invalid Promo Code')
                }));
            }
            if (this.paymentData.error || this.paymentData.idError) {
                this.store.dispatch(new DisplayErrorMessage({
                    error: new AppSubmitError(null, 'Cannot continue due to Errors')
                }));
            }
        }
    };
    /**
     * make a POST to Moneris, and triggers the AwaitPayment action
     */
    //
    PaymentComponent.prototype.submitToMoneris = function () {
        if (!this.paymentData.loading && !this.paymentData.checkingPromoCode) {
            //POST response must open in a new window, so a regular HTML Form is used
            var tempForm = window.document.createElement('form');
            tempForm.action = environment.apiUrl + "/processPayment";
            tempForm.method = 'POST';
            var applicationId = document.createElement('input');
            var applicationFee = document.createElement('input');
            var promoCode = document.createElement('input');
            var oid = document.createElement('input');
            applicationId.name = 'applicationId';
            applicationFee.name = 'applicationFee';
            promoCode.name = 'promoCode';
            oid.name = 'oid';
            applicationId.setAttribute('value', this.paymentData.id);
            applicationFee.setAttribute('value', this.paymentData.applicationFee);
            promoCode.setAttribute('value', this.paymentForm.controls['promoCode'].value);
            oid.setAttribute('value', this.authService.getUserInfo().oid); // get oid from store
            tempForm.appendChild(applicationId);
            tempForm.appendChild(applicationFee);
            tempForm.appendChild(promoCode);
            tempForm.appendChild(oid);
            window.document.body.appendChild(tempForm);
            tempForm.submit();
            tempForm.remove();
        }
    };
    /**
     * returns true if a loading screen should be shown
     */
    PaymentComponent.prototype.ifOtherPageLoading = function () {
        return (((!this.paymentData.id || !this.paymentData.applicationFee) &&
            !this.paymentData.error &&
            !this.paymentData.idError) ||
            this.paymentData.loading ||
            this.paymentData.checkingPromoCode);
    };
    PaymentComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    PaymentComponent = tslib_1.__decorate([
        Component({
            selector: 'app-payment',
            templateUrl: './payment.component.html',
            styleUrls: ['./payment.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store,
            ActivatedRoute,
            AuthService,
            MatDialog,
            Router])
    ], PaymentComponent);
    return PaymentComponent;
}());
export { PaymentComponent };
//# sourceMappingURL=payment.component.js.map