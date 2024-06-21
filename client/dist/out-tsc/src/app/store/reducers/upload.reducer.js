import * as tslib_1 from "tslib";
import { EUploadActions } from '../actions';
import { uploadAdapter, uploadInitialState } from '../states';
export function uploadReducer(state, action) {
    if (state === void 0) { state = uploadInitialState; }
    switch (action.type) {
        case EUploadActions.SAVE_TO_STORE:
            return uploadAdapter.upsertOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, saveToStore: false }));
        case EUploadActions.GET_FILES:
            return tslib_1.__assign({}, state, { loading: true, error: null });
        case EUploadActions.GET_FILES_SUCCESS:
            return uploadAdapter.upsertOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null }));
        case EUploadActions.GET_FILES_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        case EUploadActions.SUBMIT_FILES:
            return tslib_1.__assign({}, state, { loading: true, error: null });
        case EUploadActions.SUBMIT_FILES_SUCCESS:
            return tslib_1.__assign({}, state, { loading: false, error: null, saveToStore: true });
        case EUploadActions.SUBMIT_FILES_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=upload.reducer.js.map