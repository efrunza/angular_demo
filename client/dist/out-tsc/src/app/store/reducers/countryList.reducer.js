import * as tslib_1 from "tslib";
import { ECountryListActions } from 'app/store/actions';
import { countryListAdapter, countryListInitialState } from 'app/store/states';
export function countryListReducers(state, action) {
    if (state === void 0) { state = countryListInitialState; }
    switch (action.type) {
        case ECountryListActions.LOAD_COUNTRY_LIST: {
            return tslib_1.__assign({}, state, { loading: true });
        }
        case ECountryListActions.LOAD_COUNTRY_LIST_SUCCESS: {
            return countryListAdapter.addAll(action.payload, tslib_1.__assign({}, state, { loading: false, error: null }));
        }
        case ECountryListActions.LOAD_COUNTRY_LIST_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=countryList.reducer.js.map