export var EPaymentActions;
(function (EPaymentActions) {
    EPaymentActions["GET_APPLICATION_FEE"] = "[Payment] Get Application Fee";
    EPaymentActions["GET_APPLICATION_FEE_SUCCESS"] = "[Payment] Get Application Fee Success";
    EPaymentActions["GET_APPLICATION_FEE_FAIL"] = "[Payment] Get Application Fee Fail";
    EPaymentActions["UPDATE_PAYMENT_RESPONSE"] = "[Payment] Update Payment Response";
    EPaymentActions["CHECK_PROMO_CODE"] = "[Payment] Check Promo Code";
    EPaymentActions["CHECK_PROMO_CODE_SUCCESS"] = "[Payment] Check Promo Code Success";
    EPaymentActions["CHECK_PROMO_CODE_FAIL"] = "[Payment] Check Promo Code Fail";
    EPaymentActions["INCORRECT_PROMO_CODE"] = "[Payment] Incorrect Promo Code";
    EPaymentActions["PAYMENT_SUCCESS"] = "[Payment] Payment Success";
})(EPaymentActions || (EPaymentActions = {}));
var GetApplicationFee = /** @class */ (function () {
    function GetApplicationFee(payload) {
        this.payload = payload;
        this.type = EPaymentActions.GET_APPLICATION_FEE;
    }
    return GetApplicationFee;
}());
export { GetApplicationFee };
var GetApplicationFeeSuccess = /** @class */ (function () {
    function GetApplicationFeeSuccess(payload) {
        this.payload = payload;
        this.type = EPaymentActions.GET_APPLICATION_FEE_SUCCESS;
    }
    return GetApplicationFeeSuccess;
}());
export { GetApplicationFeeSuccess };
var GetApplicationFeeFail = /** @class */ (function () {
    function GetApplicationFeeFail(payload) {
        this.payload = payload;
        this.type = EPaymentActions.GET_APPLICATION_FEE_FAIL;
    }
    return GetApplicationFeeFail;
}());
export { GetApplicationFeeFail };
var UpdatePaymentResponse = /** @class */ (function () {
    function UpdatePaymentResponse(payload) {
        this.payload = payload;
        this.type = EPaymentActions.UPDATE_PAYMENT_RESPONSE;
    }
    return UpdatePaymentResponse;
}());
export { UpdatePaymentResponse };
var CheckPromoCode = /** @class */ (function () {
    function CheckPromoCode(payload) {
        this.payload = payload;
        this.type = EPaymentActions.CHECK_PROMO_CODE;
    }
    return CheckPromoCode;
}());
export { CheckPromoCode };
var CheckPromoCodeSuccess = /** @class */ (function () {
    function CheckPromoCodeSuccess(payload) {
        this.payload = payload;
        this.type = EPaymentActions.CHECK_PROMO_CODE_SUCCESS;
    }
    return CheckPromoCodeSuccess;
}());
export { CheckPromoCodeSuccess };
var CheckPromoCodeFail = /** @class */ (function () {
    function CheckPromoCodeFail(payload) {
        this.payload = payload;
        this.type = EPaymentActions.CHECK_PROMO_CODE_FAIL;
    }
    return CheckPromoCodeFail;
}());
export { CheckPromoCodeFail };
var IncorrectPromoCode = /** @class */ (function () {
    function IncorrectPromoCode(payload) {
        this.payload = payload;
        this.type = EPaymentActions.INCORRECT_PROMO_CODE;
    }
    return IncorrectPromoCode;
}());
export { IncorrectPromoCode };
var PaymentSuccess = /** @class */ (function () {
    function PaymentSuccess() {
        this.type = EPaymentActions.PAYMENT_SUCCESS;
    }
    return PaymentSuccess;
}());
export { PaymentSuccess };
//# sourceMappingURL=payment.actions.js.map