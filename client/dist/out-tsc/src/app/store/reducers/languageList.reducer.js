import * as tslib_1 from "tslib";
import { ELanguageListActions } from 'app/store/actions';
import { languageListAdapter, languageListInitialState } from 'app/store/states';
export function languageListReducers(state, action) {
    if (state === void 0) { state = languageListInitialState; }
    switch (action.type) {
        case ELanguageListActions.LOAD_LANGUAGE_LIST: {
            return tslib_1.__assign({}, state, { loading: true });
        }
        case ELanguageListActions.LOAD_LANGUAGE_LIST_SUCCESS: {
            return languageListAdapter.addAll(action.payload, tslib_1.__assign({}, state, { loading: false, error: null }));
        }
        case ELanguageListActions.LOAD_LANGUAGE_LIST_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=languageList.reducer.js.map