import * as tslib_1 from "tslib";
import { applicantInfoAdapter, applicantInfoInitialState } from '../states/applicantInfo.states';
import { EApplicantInfoActions } from '../actions';
export function applicantInfoReducers(state, action) {
    if (state === void 0) { state = applicantInfoInitialState; }
    switch (action.type) {
        case EApplicantInfoActions.LOAD_APPLICANT_INFO: {
            return tslib_1.__assign({}, state, { loading: true, error: null, selectedId: null });
        }
        case EApplicantInfoActions.LOAD_APPLICANT_INFO_SUCCESS: {
            return applicantInfoAdapter.upsertOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: false, selectedId: action.payload.appId
                    ? action.payload.appId
                    : 'newApplication' }));
        }
        case EApplicantInfoActions.LOAD_APPLICANT_INFO_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload, selectedId: null });
        }
        case EApplicantInfoActions.RESET_APPLICANT_INFO:
            return applicantInfoAdapter.removeAll(state);
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=applicantInfo.reducer.js.map