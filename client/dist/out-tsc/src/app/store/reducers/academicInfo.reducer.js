import * as tslib_1 from "tslib";
import { EAcademicInfoActions } from '../actions';
import { academicInfoAdapter, academicInfoInitialState } from '../states';
export function academicInfoReducers(state, action) {
    if (state === void 0) { state = academicInfoInitialState; }
    switch (action.type) {
        case EAcademicInfoActions.LOAD_ACADEMIC_INFO:
            return tslib_1.__assign({}, state, { loading: true, error: null });
        case EAcademicInfoActions.LOAD_ACADEMIC_INFO_SUCCESS:
            return academicInfoAdapter.addOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, selectedId: action.payload.id }));
        case EAcademicInfoActions.LOAD_ACADEMIC_INFO_FAIL:
            return tslib_1.__assign({}, state, { loading: false, error: action.payload, selectedId: null });
        case EAcademicInfoActions.SUBMIT_ACADEMIC_INFO:
            return tslib_1.__assign({}, state, { saving: true, error: null });
        case EAcademicInfoActions.SUBMIT_ACADEMIC_INFO_SUCCESS:
            return academicInfoAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, tslib_1.__assign({}, state, { saving: false, error: null }));
        case EAcademicInfoActions.SUBMIT_ACADEMIC_INFO_FAIL:
            return tslib_1.__assign({}, state, { saving: false, error: action.payload });
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=academicInfo.reducer.js.map