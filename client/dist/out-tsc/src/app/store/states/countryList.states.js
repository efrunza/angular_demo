import { createEntityAdapter } from '@ngrx/entity';
export var countryListAdapter = createEntityAdapter({
    selectId: function (countryList) { return countryList.code; }
});
export var countryListInitialState = countryListAdapter.getInitialState({
    selectedInfoId: null,
    loading: false,
    error: null
});
//# sourceMappingURL=countryList.states.js.map