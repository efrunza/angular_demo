import { createEntityAdapter } from '@ngrx/entity';
export var paymentAdapter = createEntityAdapter({
    selectId: function (payment) { return payment.id; }
});
export var paymentInitialState = paymentAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null,
    paid: false,
    promoValid: false,
    promoError: null,
    promoFormError: null,
    checkingPromoCode: false,
    paymentResponse: null
});
//# sourceMappingURL=payment.states.js.map