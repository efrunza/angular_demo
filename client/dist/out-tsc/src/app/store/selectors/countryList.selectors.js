var _a;
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { countryListAdapter } from 'app/store/states';
export var getError = function (state) { return state.error; };
export var getIsLoading = function (state) {
    return state.loading;
};
export var selectCountryList = createFeatureSelector('countryList');
export var selectIds = (_a = countryListAdapter.getSelectors(selectCountryList), _a.selectIds), selectEntities = _a.selectEntities, selectAll = _a.selectAll, selectTotal = _a.selectTotal;
export var selectError = createSelector(selectCountryList, getError);
export var selectLoading = createSelector(selectCountryList, getIsLoading);
//# sourceMappingURL=countryList.selectors.js.map