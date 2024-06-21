import { createFeatureSelector, createSelector } from '@ngrx/store';
import { personalInfoAdapter } from 'app/store/states';
var getError = function (state) { return state.error; };
var getIsLoading = function (state) { return state.loading; };
var getIsSaving = function (state) { return state.saving; };
export var selectPersonalInfo = createFeatureSelector('personalInfo');
var _a = personalInfoAdapter.getSelectors(selectPersonalInfo), selectIds = _a.selectIds, selectEntities = _a.selectEntities, selectAll = _a.selectAll, selectTotal = _a.selectTotal;
export var selectById = function (id) {
    createSelector(selectAll, function (data) {
        if (data.length > 0) {
            return data.find(function (info) { return info.appId === id; });
        }
        return null;
    });
};
export var selectCountryOfApplication = createSelector(selectAll, function (data) {
    if (data.length > 0) {
        var result = data[data.length - 1];
        var CountryOfApplication = result.countryOA;
        return CountryOfApplication;
    }
});
// Custom selector to format the 'applicant bio data' API data based on the personal-info form
export var selectFormatted = createSelector(selectAll, function (list) {
    // variable holding the formatted data
    var formattedData = null;
    if (list.length > 0) {
        var data = list[list.length - 1];
        if (data) {
            formattedData = data;
            if (data.gender) {
                if (data.gender.length > 1) {
                    // issue caused by the review submit component. could be removed after refactor of the review-submit
                    formattedData.gender = data.gender.substring(0, 1).toLowerCase();
                }
            }
        }
    }
    return formattedData;
});
export var selectError = createSelector(selectPersonalInfo, getError);
export var selectLoading = createSelector(selectPersonalInfo, getIsLoading);
export var selectSaving = createSelector(selectPersonalInfo, getIsSaving);
//# sourceMappingURL=personalInfo.selectors.js.map