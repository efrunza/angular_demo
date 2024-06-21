import { createEntityAdapter } from '@ngrx/entity';
export var programChoiceAdapter = createEntityAdapter({
    selectId: function (programChoice) { return programChoice.applicationId; }
});
export var programChoiceInitialState = programChoiceAdapter.getInitialState({
    selectedInfoId: null,
    loading: false,
    error: null,
    saving: false
});
//# sourceMappingURL=programChoice.states.js.map