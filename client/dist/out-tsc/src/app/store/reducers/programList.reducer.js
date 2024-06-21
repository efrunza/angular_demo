import * as tslib_1 from "tslib";
import { programListContainerAdapter, programListContainerInitialState } from '../states';
import { EProgramListActions } from '../actions';
export function programListReducers(state, action) {
    if (state === void 0) { state = programListContainerInitialState; }
    switch (action.type) {
        case EProgramListActions.LOAD_PROGRAMS:
            var id = action.payload.id;
            return programListContainerAdapter.updateOne({
                id: id,
                changes: {
                    loading: true,
                    error: null
                }
            }, tslib_1.__assign({}, state, { selectedId: id }));
        case EProgramListActions.LOAD_PROGRAM_SUCCESS:
            var _a = action.payload, updatedId = _a.id, list = _a.list, month = _a.month, visa = _a.visa, year = _a.year;
            return programListContainerAdapter.updateOne({
                id: updatedId,
                changes: {
                    list: list,
                    month: month,
                    visa: visa,
                    year: year,
                    loading: false,
                    error: null
                }
            }, tslib_1.__assign({}, state, { selectedId: updatedId }));
        case EProgramListActions.LOAD_PROGRAM_FAIL:
            var update = {
                id: state.selectedId,
                changes: {
                    loading: false,
                    error: action.payload
                }
            };
            return programListContainerAdapter.updateOne(update, tslib_1.__assign({}, state));
        case EProgramListActions.RESET_PROGRAM_LIST:
            return programListContainerInitialState;
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=programList.reducer.js.map