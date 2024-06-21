import * as tslib_1 from "tslib";
import { EPaymentActions } from '../actions';
import { paymentAdapter, paymentInitialState } from '../states';
export function paymentReducers(state, action) {
    if (state === void 0) { state = paymentInitialState; }
    switch (action.type) {
        case EPaymentActions.GET_APPLICATION_FEE: {
            return tslib_1.__assign({}, state, { loading: true, error: null, promoError: null, promoFormError: null });
        }
        case EPaymentActions.GET_APPLICATION_FEE_SUCCESS: {
            return paymentAdapter.addOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, promoError: null, promoFormError: null }));
        }
        case EPaymentActions.GET_APPLICATION_FEE_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload, promoError: null, promoFormError: null });
        }
        case EPaymentActions.UPDATE_PAYMENT_RESPONSE: {
            return tslib_1.__assign({}, state, { paymentResponse: action.payload, error: null, promoError: null, promoFormError: null });
        }
        case EPaymentActions.CHECK_PROMO_CODE: {
            return tslib_1.__assign({}, state, { checkingPromoCode: true, error: null, promoError: null, promoFormError: null });
        }
        case EPaymentActions.CHECK_PROMO_CODE_SUCCESS: {
            return tslib_1.__assign({}, state, { checkingPromoCode: false, promoValid: true, promoFormError: null, error: null, promoError: null });
        }
        case EPaymentActions.CHECK_PROMO_CODE_FAIL: {
            return tslib_1.__assign({}, state, { checkingPromoCode: false, promoValid: false, promoError: action.payload, error: null, promoFormError: null });
        }
        case EPaymentActions.INCORRECT_PROMO_CODE: {
            return tslib_1.__assign({}, state, { checkingPromoCode: false, promoValid: false, promoError: null, error: null, promoFormError: action.payload });
        }
        case EPaymentActions.PAYMENT_SUCCESS: {
            return tslib_1.__assign({}, state, { paid: true, checkingPromoCode: false, promoValid: false, promoError: null, error: null, promoFormError: null });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=payment.reducer.js.map