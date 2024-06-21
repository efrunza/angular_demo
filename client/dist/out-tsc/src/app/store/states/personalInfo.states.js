import { createEntityAdapter } from '@ngrx/entity';
export var personalInfoAdapter = createEntityAdapter({
    selectId: function (personalInfo) {
        // Logic for new applicants is being handled in the personal info effects
        if (personalInfo.appId) {
            return personalInfo.appId;
        }
        else {
            return 'newApplication';
        }
    }
});
export var personalInfoInitialState = personalInfoAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null,
    saving: false
});
//# sourceMappingURL=personalInfo.states.js.map