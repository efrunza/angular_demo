import { academicInfoAdapter } from '../states';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ESchoolLevel, SchoolInfo } from 'shared/models';
var getError = function (state) { return state.error; };
var getIsLoading = function (state) { return state.loading; };
var getIsSaving = function (state) { return state.saving; };
var getSelectedId = function (state) { return state.selectedId; };
var selectAcademicInfo = createFeatureSelector('academicInfo');
var _a = academicInfoAdapter.getSelectors(selectAcademicInfo), selectEntities = _a.selectEntities, selectAll = _a.selectAll;
export var selectLatest = createSelector(selectEntities, selectAcademicInfo, function (list, state) {
    var selectedId = getSelectedId(state);
    if (selectedId) {
        var data = list[selectedId];
        var id = data.id, _a = data.schoolsAttended, schoolsAttended = _a === void 0 ? [] : _a;
        var highSchool = void 0;
        var postSecondaryEdus = void 0;
        if (schoolsAttended === []) {
            highSchool = new SchoolInfo();
            postSecondaryEdus = [];
        }
        else {
            highSchool =
                schoolsAttended.find(function (edu) { return edu.level === ESchoolLevel.HIGH_SCHOOL; }) ||
                    new SchoolInfo();
            postSecondaryEdus = schoolsAttended.filter(function (edu) { return edu.level !== ESchoolLevel.HIGH_SCHOOL; });
        }
        return {
            id: id,
            highSchool: highSchool,
            postSecondaryEdus: postSecondaryEdus
        };
    }
    return null;
});
export var selectSelectedAcademicInfo = createSelector(selectEntities, selectAcademicInfo, function (list, state) {
    var selectedId = getSelectedId(state);
    return selectedId ? list[selectedId] : null;
});
export var selectError = createSelector(selectAcademicInfo, getError);
export var selectLoading = createSelector(selectAcademicInfo, getIsLoading);
export var selectSaving = createSelector(selectAcademicInfo, getIsSaving);
//# sourceMappingURL=academicInfo.selectors.js.map