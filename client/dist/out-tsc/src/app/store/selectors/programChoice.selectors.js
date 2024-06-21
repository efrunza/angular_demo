import { createFeatureSelector, createSelector } from '@ngrx/store';
import { programChoiceAdapter } from '../states';
export var getError = function (state) { return state.error; };
export var getIsLoading = function (state) {
    return state.loading;
};
export var getIsSaving = function (state) {
    return state.saving;
};
var selectProgramChoices = createFeatureSelector('programChoice');
var selectAll = programChoiceAdapter.getSelectors(selectProgramChoices).selectAll;
export var selectProgramChoice = createSelector(selectAll, function (programChoiceApps) {
    if (programChoiceApps.length > 0) {
        return programChoiceApps[programChoiceApps.length - 1];
    }
    return null;
});
export var selectError = createSelector(selectProgramChoices, getError);
export var selectLoading = createSelector(selectProgramChoices, getIsLoading);
export var selectSaving = createSelector(selectProgramChoices, getIsSaving);
//# sourceMappingURL=programChoice.selectors.js.map