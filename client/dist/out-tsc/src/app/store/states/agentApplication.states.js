import { createEntityAdapter } from '@ngrx/entity';
export var agentAppAdapter = createEntityAdapter({
    selectId: function (agentApp) { return agentApp.appId; }
});
export var agentApplicationInitialState = agentAppAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null,
    saving: false
});
//# sourceMappingURL=agentApplication.states.js.map