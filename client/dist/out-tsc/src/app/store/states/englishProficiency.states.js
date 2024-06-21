import { createEntityAdapter } from '@ngrx/entity';
export var englishProficiencyAdapter = createEntityAdapter({
    selectId: function (englishProficiency) { return englishProficiency.id; }
});
export var englishProficiencyInitialState = englishProficiencyAdapter.getInitialState({
    selectedId: null,
    loading: true,
    error: null,
    saving: false
});
//# sourceMappingURL=englishProficiency.states.js.map