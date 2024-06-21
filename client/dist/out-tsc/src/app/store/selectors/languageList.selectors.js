var _a;
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { languageListAdapter } from 'app/store/states';
export var getError = function (state) { return state.error; };
export var getIsLoading = function (state) {
    return state.loading;
};
export var selectLanguageList = createFeatureSelector('languageList');
export var selectIds = (_a = languageListAdapter.getSelectors(selectLanguageList), _a.selectIds), selectEntities = _a.selectEntities, selectAll = _a.selectAll, selectTotal = _a.selectTotal;
export var selectError = createSelector(selectLanguageList, getError);
export var selectLoading = createSelector(selectLanguageList, getIsLoading);
//# sourceMappingURL=languageList.selectors.js.map