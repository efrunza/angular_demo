import { agentAppAdapter } from '../states';
import { createFeatureSelector, createSelector } from '@ngrx/store';
var getError = function (state) { return state.error; };
var getIsLoading = function (state) { return state.loading; };
var getIsSaving = function (state) { return state.saving; };
export var getSelectedId = function (state) {
    return state.selectedId;
};
var selectAgentApplications = createFeatureSelector('agentApplications');
var _a = agentAppAdapter.getSelectors(selectAgentApplications), selectEntities = _a.selectEntities, selectAll = _a.selectAll;
export var selectAgentApps = selectAll;
export var selectError = createSelector(selectAgentApplications, getError);
export var selectLoading = createSelector(selectAgentApplications, getIsLoading);
export var selectSaving = createSelector(selectAgentApplications, getIsSaving);
//# sourceMappingURL=agentApplication.selectors.js.map