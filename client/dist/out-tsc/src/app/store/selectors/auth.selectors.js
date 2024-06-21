import { authAdapter } from '../states/auth.states';
import { createFeatureSelector, createSelector } from '@ngrx/store';
var getError = function (state) { return state.error; };
var getIsLoading = function (state) { return state.loading; };
var getSelectedId = function (state) {
    return state.selectedId;
};
var selectUser = createFeatureSelector('user');
var _a = authAdapter.getSelectors(selectUser), selectAll = _a.selectAll, selectEntities = _a.selectEntities;
export var selectUserInfo = createSelector(selectEntities, selectUser, function (entities, state) {
    var selectedId = getSelectedId(state);
    return selectedId === null ? null : entities[selectedId];
});
export var selectAgentId = createSelector(selectEntities, selectUser, function (entities, state) {
    var selectedId = getSelectedId(state);
    return selectedId === null ? null : entities[selectedId].agentId;
});
export var selectError = createSelector(selectUser, getError);
export var selectLoading = createSelector(selectUser, getIsLoading);
//# sourceMappingURL=auth.selectors.js.map