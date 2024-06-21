export var EAgentApplicationActions;
(function (EAgentApplicationActions) {
    EAgentApplicationActions["LOAD_AGENT_APPLICATIONS"] = "[AgentApplications] LOAD";
    EAgentApplicationActions["LOAD_AGENT_APPLICATIONS_SUCCESS"] = "[AgentApplications] LOAD SUCCESS";
    EAgentApplicationActions["LOAD_AGENT_APPLICATIONS_FAIL"] = "[AgentApplications] LOAD FAIL";
})(EAgentApplicationActions || (EAgentApplicationActions = {}));
var LoadAgentApplications = /** @class */ (function () {
    function LoadAgentApplications() {
        this.type = EAgentApplicationActions.LOAD_AGENT_APPLICATIONS;
    }
    return LoadAgentApplications;
}());
export { LoadAgentApplications };
var LoadAgentApplicationsSuccess = /** @class */ (function () {
    function LoadAgentApplicationsSuccess(payload) {
        this.payload = payload;
        this.type = EAgentApplicationActions.LOAD_AGENT_APPLICATIONS_SUCCESS;
    }
    return LoadAgentApplicationsSuccess;
}());
export { LoadAgentApplicationsSuccess };
var LoadAgentApplicationsFail = /** @class */ (function () {
    function LoadAgentApplicationsFail(payload) {
        this.payload = payload;
        this.type = EAgentApplicationActions.LOAD_AGENT_APPLICATIONS_FAIL;
    }
    return LoadAgentApplicationsFail;
}());
export { LoadAgentApplicationsFail };
//# sourceMappingURL=agentApplication.actions.js.map