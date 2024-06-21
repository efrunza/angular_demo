import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paymentAdapter } from '../states';
export var getIsLoading = function (state) { return state.loading; };
export var getError = function (state) { return state.error; };
export var getPaid = function (state) { return state.paid; };
export var getPaymentResponse = function (state) { return state.paymentResponse; };
export var getPromoError = function (state) {
    return state.promoError;
};
export var getPromoFormError = function (state) {
    return state.promoFormError;
};
export var getPromoValid = function (state) {
    return state.promoValid;
};
export var getCheckingPromoCode = function (state) {
    return state.checkingPromoCode;
};
export var selectPayment = createFeatureSelector('payment');
var _a = paymentAdapter.getSelectors(selectPayment), selectIds = _a.selectIds, selectEntities = _a.selectEntities, selectAll = _a.selectAll, selectTotal = _a.selectTotal;
export var selectLatest = createSelector(selectAll, function (list) {
    if (list.length > 0) {
        var data = list[list.length - 1];
        var id = data.id, applicationFee = data.applicationFee;
        return {
            id: id,
            applicationFee: applicationFee
        };
    }
    return null;
});
export var selectError = createSelector(selectPayment, getError);
export var selectLoading = createSelector(selectPayment, getIsLoading);
export var selectPaid = createSelector(selectPayment, getPaid);
export var selectPaymentResponse = createSelector(selectPayment, getPaymentResponse);
export var selectPromoValid = createSelector(selectPayment, getPromoValid);
export var selectPromoError = createSelector(selectPayment, getPromoError);
export var selectPromoFormError = createSelector(selectPayment, getPromoFormError);
export var selectCheckingPromoCode = createSelector(selectPayment, getCheckingPromoCode);
//# sourceMappingURL=payment.selectors.js.map