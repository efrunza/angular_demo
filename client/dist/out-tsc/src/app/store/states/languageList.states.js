import { createEntityAdapter } from '@ngrx/entity';
export var languageListAdapter = createEntityAdapter({
    selectId: function (languageList) { return languageList.code; }
});
export var languageListInitialState = languageListAdapter.getInitialState({
    selectedInfoId: null,
    loading: false,
    error: null
});
//# sourceMappingURL=languageList.states.js.map