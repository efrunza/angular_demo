import { createFeatureSelector, createSelector } from '@ngrx/store';
import { infoReleaseAdapter } from '../states';
var getError = function (state) { return state.error; };
var getIsLoading = function (state) { return state.loading; };
var getSelectedId = function (state) { return state.selectedId; };
var selectInfoRelease = createFeatureSelector('infoRelease');
var _a = infoReleaseAdapter.getSelectors(selectInfoRelease), selectEntities = _a.selectEntities, selectAll = _a.selectAll;
export var selectInfoReleaseData = createSelector(selectEntities, selectInfoRelease, function (entities, state) {
    var selectedId = getSelectedId(state);
    return selectedId ? entities[selectedId] : null;
});
export var selectError = createSelector(selectInfoRelease, getError);
export var selectLoading = createSelector(selectInfoRelease, getIsLoading);
//# sourceMappingURL=infoRelease.selectors.js.map