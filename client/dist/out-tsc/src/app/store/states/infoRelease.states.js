import { createEntityAdapter } from '@ngrx/entity';
export var infoReleaseAdapter = createEntityAdapter({
    selectId: function (infoRelease) { return infoRelease.id; }
});
export var infoReleaseInitialState = infoReleaseAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null,
    saving: false
});
//# sourceMappingURL=infoRelease.states.js.map