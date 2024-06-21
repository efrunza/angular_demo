import * as tslib_1 from "tslib";
import { EInfoReleaseActions } from '../actions';
import { infoReleaseAdapter, infoReleaseInitialState } from '../states';
export function infoReleaseReducer(state, action) {
    if (state === void 0) { state = infoReleaseInitialState; }
    switch (action.type) {
        case EInfoReleaseActions.LOAD_INFO_RELEASE: {
            return tslib_1.__assign({}, state, { loading: true, error: null });
        }
        case EInfoReleaseActions.LOAD_INFO_RELEASE_SUCCESS: {
            return infoReleaseAdapter.addOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, selectedId: action.payload.id }));
        }
        case EInfoReleaseActions.LOAD_INFO_RELEASE_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        case EInfoReleaseActions.SUBMIT_INFO_RELEASE: {
            return tslib_1.__assign({}, state, { saving: true, error: null });
        }
        case EInfoReleaseActions.SUBMIT_INFO_RELEASE_SUCCESS: {
            return infoReleaseAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, tslib_1.__assign({}, state, { saving: false, error: null }));
        }
        case EInfoReleaseActions.SUBMIT_INFO_RELEASE_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=infoRelease.reducer.js.map