import { createEntityAdapter } from '@ngrx/entity';
export var academicInfoAdapter = createEntityAdapter({
    selectId: function (academicInfo) { return academicInfo.id; }
});
export var academicInfoInitialState = academicInfoAdapter.getInitialState({
    selectedId: null,
    loading: false,
    error: null,
    saving: false
});
//# sourceMappingURL=academicInfo.states.js.map