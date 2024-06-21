import * as tslib_1 from "tslib";
import { programChoiceAdapter, programChoiceInitialState } from '../states';
import { EProgramChoiceActions } from '../actions';
export function programChoiceReducers(state, action) {
    if (state === void 0) { state = programChoiceInitialState; }
    switch (action.type) {
        case EProgramChoiceActions.LOAD_PROGRAM_CHOICES:
            return tslib_1.__assign({}, state, { loading: true, error: null, selectedId: null });
        case EProgramChoiceActions.LOAD_PROGRAM_CHOICES_SUCCESS:
            return programChoiceAdapter.addOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, selectedId: action.payload.applicationId }));
        case EProgramChoiceActions.LOAD_PROGRAM_CHOICES_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload, selectedId: null });
        case EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES:
            return tslib_1.__assign({}, state, { saving: true, error: null });
        case EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES_SUCCESS:
            return programChoiceAdapter.updateOne({
                id: action.payload.applicationId,
                changes: action.payload
            }, tslib_1.__assign({}, state, { saving: false, error: null }));
        case EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES_FAIL:
            return tslib_1.__assign({}, state, { saving: false, error: action.payload });
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=programChoice.reducer.js.map