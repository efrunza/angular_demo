import { createFeatureSelector, createSelector } from '@ngrx/store';
import { englishProficiencyAdapter } from '../states';
var getError = function (state) { return state.error; };
var getIsLoading = function (state) {
    return state.loading;
};
var getSelectedId = function (state) {
    return state.selectedId;
};
var getIsSaving = function (state) { return state.saving; };
var selectEnglishProficiency = createFeatureSelector('englishProficiency');
var _a = englishProficiencyAdapter.getSelectors(selectEnglishProficiency), selectEntities = _a.selectEntities, selectAll = _a.selectAll;
export var selectEnglishProfData = createSelector(selectEntities, selectEnglishProficiency, function (entities, state) {
    var selectedId = getSelectedId(state);
    return selectedId ? entities[selectedId] : null;
});
export var selectError = createSelector(selectEnglishProficiency, getError);
export var selectLoading = createSelector(selectEnglishProficiency, getIsLoading);
export var selectSaving = createSelector(selectEnglishProficiency, getIsSaving);
//# sourceMappingURL=englishProficiency.selectors.js.map