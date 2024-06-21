import { createFeatureSelector, createSelector } from '@ngrx/store';
import { applicantInfoAdapter } from '../states';
export var getError = function (state) { return state.error; };
export var getIsLoading = function (state) {
    return state.loading;
};
export var selectApplicantInfo = createFeatureSelector('applicantInfo');
var selectAll = applicantInfoAdapter.getSelectors(selectApplicantInfo).selectAll;
// Custom selector for the application ID
export var selectApplicationID = createSelector(selectAll, function (data) {
    if (data.length > 0) {
        var result = data[data.length - 1];
        var applicationId = result.appId;
        return applicationId;
    }
});
// Custom selector for the last step completed by the user
export var selectlastStep = createSelector(selectAll, function (data) {
    if (data.length > 0) {
        var result = data[data.length - 1];
        var lastStep = result.lastStep;
        return lastStep;
    }
});
export var selectCurrentAppInfo = createSelector(selectAll, function (data) {
    if (data.length > 0) {
        return data[data.length - 1];
    }
});
export var selectError = createSelector(selectApplicantInfo, getError);
export var selectLoading = createSelector(selectApplicantInfo, getIsLoading);
//# sourceMappingURL=applicantInfo.selectors.js.map