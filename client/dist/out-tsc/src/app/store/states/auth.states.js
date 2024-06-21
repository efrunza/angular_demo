import { createEntityAdapter } from '@ngrx/entity';
export var authAdapter = createEntityAdapter({
    selectId: function (user) { return user.oid; }
});
export var authInitialState = authAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null
});
//# sourceMappingURL=auth.states.js.map