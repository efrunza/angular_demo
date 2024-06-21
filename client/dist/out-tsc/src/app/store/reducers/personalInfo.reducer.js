import * as tslib_1 from "tslib";
import { EPersonalInfoActions } from '../actions/personalInfo.actions';
import { personalInfoInitialState, personalInfoAdapter } from '../states';
export function personalInfoReducers(state, action) {
    if (state === void 0) { state = personalInfoInitialState; }
    switch (action.type) {
        case EPersonalInfoActions.LOAD_PERSONAL_INFO:
            return tslib_1.__assign({}, state, { loading: true, error: null, selectedId: null });
        case EPersonalInfoActions.LOAD_PERSONAL_INFO_SUCCESS:
            return personalInfoAdapter.upsertOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, selectedId: action.payload.appId }));
        case EPersonalInfoActions.LOAD_PERSONAL_INFO_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload, selectedId: null });
        case EPersonalInfoActions.SUBMIT_PERSONAL_INFO:
            return tslib_1.__assign({}, state, { saving: true, error: null });
        case EPersonalInfoActions.SUBMIT_PERSONAL_INFO_SUCCESS:
            return personalInfoAdapter.upsertOne(action.payload, tslib_1.__assign({}, state, { saving: false, error: null }));
        case EPersonalInfoActions.SUBMIT_PERSONAL_INFO_FAIL:
            return tslib_1.__assign({}, state, { saving: false, error: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=personalInfo.reducer.js.map