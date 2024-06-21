import { createEntityAdapter } from '@ngrx/entity';
export var programListContainerAdapter = createEntityAdapter({
    selectId: function (programItem) { return programItem.id; }
});
export var programListContainerInitialState = programListContainerAdapter.getInitialState({
    selectedId: null,
    ids: ['0', '1', '2'],
    entities: [
        {
            id: '0',
            list: [],
            loading: true,
            error: null,
            month: null,
            visa: null,
            year: null
        },
        {
            id: '1',
            list: [],
            loading: true,
            error: null,
            month: null,
            visa: null,
            year: null
        },
        {
            id: '2',
            list: [],
            loading: true,
            error: null,
            month: null,
            visa: null,
            year: null
        }
    ]
});
//# sourceMappingURL=programList.states.js.map