import { createEntityAdapter } from '@ngrx/entity';
export var uploadAdapter = createEntityAdapter({
    selectId: function (files) { return files.id; }
});
export var uploadInitialState = uploadAdapter.getInitialState({
    selectedId: null,
    loading: true,
    error: null,
    saveToStore: false
});
//# sourceMappingURL=upload.state.js.map