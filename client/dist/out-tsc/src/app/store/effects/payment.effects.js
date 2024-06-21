import * as tslib_1 from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppLoadError, AppSubmitError } from 'app/shared/models';
import { of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PaymentService } from 'shared/services/api/payment.service';
import { CheckPromoCodeSuccess, EPaymentActions, GetApplicationFeeSuccess, IncorrectPromoCode } from '../actions';
var PaymentEffects = /** @class */ (function () {
    function PaymentEffects(paymentService, actions$) {
        var _this = this;
        this.paymentService = paymentService;
        this.actions$ = actions$;
        this.getApplicationFee$ = this.actions$.pipe(ofType(EPaymentActions.GET_APPLICATION_FEE), switchMap(function (action) {
            return _this.paymentService.getApplicationFee().pipe(map(function (applicationFeeData) {
                var newApplicationFee = {
                    applicationFee: applicationFeeData.applicationFee,
                    id: action.payload
                };
                return new GetApplicationFeeSuccess(newApplicationFee);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppLoadError(error.id, error.message)
                    : new AppLoadError();
                return observableOf(displayError);
            }));
        }));
        this.checkPromoCode$ = this.actions$.pipe(ofType(EPaymentActions.CHECK_PROMO_CODE), switchMap(function (action) {
            return _this.paymentService.checkPromoCode(action.payload).pipe(map(function (payment) {
                if (payment.message === 'success') {
                    return new CheckPromoCodeSuccess(payment);
                }
                else {
                    payment.message = 'Not a Valid Promo Code.';
                    return new IncorrectPromoCode(new AppSubmitError(null, payment.message));
                }
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppSubmitError(error.id, error.message)
                    : new AppSubmitError();
                return observableOf(new IncorrectPromoCode(displayError));
            }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentEffects.prototype, "getApplicationFee$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentEffects.prototype, "checkPromoCode$", void 0);
    PaymentEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [PaymentService,
            Actions])
    ], PaymentEffects);
    return PaymentEffects;
}());
export { PaymentEffects };
//# sourceMappingURL=payment.effects.js.map