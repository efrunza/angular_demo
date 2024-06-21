import { createFeatureSelector, createSelector } from '@ngrx/store';
import { programListContainerAdapter } from '../states';
var selectSelectedId = function (state) {
    return state.selectedId;
};
var getError = function (state, entities) {
    var selectedId = selectSelectedId(state);
    return entities[selectedId] ? entities[selectedId].error : null;
};
var getIsLoading = function (state, entities) {
    var selectedId = selectSelectedId(state);
    return selectedId ? entities[selectedId].loading : true;
};
var selectProgramListContainer = createFeatureSelector('programList');
var _a = programListContainerAdapter.getSelectors(selectProgramListContainer), selectEntities = _a.selectEntities, selectAll = _a.selectAll;
export var selectSelectedProgramList = createSelector(selectEntities, selectProgramListContainer, function (entities, state) {
    var selectedId = selectSelectedId(state);
    return entities[selectedId];
});
export var selectProgramItemById = function (index) {
    return createSelector(selectEntities, function (entities) {
        return entities[index];
    });
};
export var selectProgramByCode = function (code) {
    return createSelector(selectAll, function (list) {
        var foundProgram = null;
        var isFound = false;
        for (var i = 0; i < list.length && !isFound; i++) {
            foundProgram = list[i].list.find(function (item) { return item.programCode === code; });
            if (foundProgram) {
                isFound = true;
            }
        }
        return foundProgram ? foundProgram : null;
    });
};
export var selectError = createSelector(selectProgramListContainer, selectEntities, function (state, entities) { return getError(state, entities); });
export var selectLoading = createSelector(selectProgramListContainer, selectEntities, function (state, entities) { return getIsLoading(state, entities); });
//# sourceMappingURL=programList.selectors.js.map