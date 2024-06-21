import * as tslib_1 from "tslib";
import { authAdapter, authInitialState } from '../states/auth.states';
import { EAuthActions } from '../actions/auth.actions';
export function authReducers(state, action) {
    if (state === void 0) { state = authInitialState; }
    switch (action.type) {
        case EAuthActions.ADD_USER:
            return tslib_1.__assign({}, state, { loading: true, error: null, selectedId: null });
        case EAuthActions.ADD_USER_SUCCESS:
            return authAdapter.addOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, selectedId: action.payload.oid }));
        case EAuthActions.ADD_USER_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload, selectedId: null });
        case EAuthActions.VERIFY_AGENT:
            return tslib_1.__assign({}, state, { loading: true, error: null });
        case EAuthActions.VERIFY_AGENT_SUCCESS:
            return tslib_1.__assign({}, state, { loading: false, error: null });
        case EAuthActions.VERIFY_AGENT_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=auth.reducer.js.map