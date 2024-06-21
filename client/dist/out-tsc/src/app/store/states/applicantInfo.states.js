import { createEntityAdapter } from '@ngrx/entity';
export var applicantInfoAdapter = createEntityAdapter({
    selectId: function (applicant) {
        // We need a temporary ID here beacause new users will not have an appId until they submit their personal information
        if (applicant.appId) {
            return applicant.appId;
        }
        else {
            return 'newApplication';
        }
    }
});
export var applicantInfoInitialState = applicantInfoAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null
});
//# sourceMappingURL=applicantInfo.states.js.map