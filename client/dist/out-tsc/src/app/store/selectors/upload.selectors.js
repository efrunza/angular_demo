var _a;
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { uploadAdapter } from '../states';
export var getIsLoading = function (state) { return state.loading; };
export var getError = function (state) { return state.error; };
export var getSaveToStore = function (state) {
    return state.saveToStore;
};
export var selectUpload = createFeatureSelector('upload');
export var selectIds = (_a = uploadAdapter.getSelectors(selectUpload), _a.selectIds), selectEntities = _a.selectEntities, selectAll = _a.selectAll, selectTotal = _a.selectTotal;
export var selectLatest = createSelector(selectAll, function (list) {
    if (list.length > 0) {
        var data = list[list.length - 1];
        var id = data.id, files = data.files;
        return {
            id: id,
            files: files
        };
    }
    return null;
});
export var selectLoading = createSelector(selectUpload, getIsLoading);
export var selectError = createSelector(selectUpload, getError);
export var selectSaveToStore = createSelector(selectUpload, getSaveToStore);
//# sourceMappingURL=upload.selectors.js.map