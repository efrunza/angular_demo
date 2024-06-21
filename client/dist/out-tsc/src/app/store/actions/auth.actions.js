export var EAuthActions;
(function (EAuthActions) {
    EAuthActions["ADD_USER"] = "[Auth] ADD";
    EAuthActions["ADD_USER_SUCCESS"] = "[Auth] ADD SUCCESS";
    EAuthActions["ADD_USER_FAIL"] = "[Auth] ADD FAIL";
    EAuthActions["VERIFY_AGENT"] = "[AUTH] VERIFY AGENT";
    EAuthActions["VERIFY_AGENT_SUCCESS"] = "[AUTH] VERIFY AGENT SUCCESS";
    EAuthActions["VERIFY_AGENT_FAIL"] = "[AUTH] VERIFY AGENT FAIL";
})(EAuthActions || (EAuthActions = {}));
var AddNewUser = /** @class */ (function () {
    function AddNewUser(payload) {
        if (payload === void 0) { payload = null; }
        this.payload = payload;
        this.type = EAuthActions.ADD_USER;
    }
    return AddNewUser;
}());
export { AddNewUser };
var AddNewUserSuccess = /** @class */ (function () {
    function AddNewUserSuccess(payload) {
        this.payload = payload;
        this.type = EAuthActions.ADD_USER_SUCCESS;
    }
    return AddNewUserSuccess;
}());
export { AddNewUserSuccess };
var AddNewUserFail = /** @class */ (function () {
    function AddNewUserFail(payload) {
        this.payload = payload;
        this.type = EAuthActions.ADD_USER_FAIL;
    }
    return AddNewUserFail;
}());
export { AddNewUserFail };
var VerifyAgent = /** @class */ (function () {
    function VerifyAgent() {
        this.type = EAuthActions.VERIFY_AGENT;
    }
    return VerifyAgent;
}());
export { VerifyAgent };
var VerifyAgentSuccess = /** @class */ (function () {
    function VerifyAgentSuccess(payload) {
        this.payload = payload;
        this.type = EAuthActions.VERIFY_AGENT_SUCCESS;
    }
    return VerifyAgentSuccess;
}());
export { VerifyAgentSuccess };
var VerifyAgentFail = /** @class */ (function () {
    function VerifyAgentFail(payload) {
        this.payload = payload;
        this.type = EAuthActions.VERIFY_AGENT_FAIL;
    }
    return VerifyAgentFail;
}());
export { VerifyAgentFail };
//# sourceMappingURL=auth.actions.js.map