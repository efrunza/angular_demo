import * as tslib_1 from "tslib";
import { agentAppAdapter, agentApplicationInitialState } from '../states';
import { EAgentApplicationActions } from '../actions';
export function agentApplicationReducer(state, action) {
    if (state === void 0) { state = agentApplicationInitialState; }
    switch (action.type) {
        case EAgentApplicationActions.LOAD_AGENT_APPLICATIONS: {
            return tslib_1.__assign({}, state, { loading: true });
        }
        case EAgentApplicationActions.LOAD_AGENT_APPLICATIONS_SUCCESS: {
            return agentAppAdapter.addMany(action.payload, tslib_1.__assign({}, state, { loading: false, error: null }));
        }
        case EAgentApplicationActions.LOAD_AGENT_APPLICATIONS_FAIL: {
            return tslib_1.__assign({}, state, { loading: false, error: action.payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=agentApplication.reducer.js.map