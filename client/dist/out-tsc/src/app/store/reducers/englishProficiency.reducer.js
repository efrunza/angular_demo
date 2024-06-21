import * as tslib_1 from "tslib";
import { EEnglishProficiencyActions } from '../actions';
import { englishProficiencyAdapter, englishProficiencyInitialState } from '../states';
export function englishProficiencyReducers(state, action) {
    if (state === void 0) { state = englishProficiencyInitialState; }
    switch (action.type) {
        case EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY: {
            return tslib_1.__assign({}, state, { loading: true, error: null });
        }
        case EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY_SUCCESS: {
            return englishProficiencyAdapter.addOne(action.payload, tslib_1.__assign({}, state, { loading: false, error: null, selectedId: action.payload.id }));
        }
        case EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        case EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY: {
            return tslib_1.__assign({}, state, { saving: true, error: null });
        }
        case EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY_SUCCESS: {
            return englishProficiencyAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, tslib_1.__assign({}, state, { saving: false, error: null }));
        }
        case EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=englishProficiency.reducer.js.map