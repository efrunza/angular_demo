//  Enumeration defining the different actions
export var EPersonalInfoActions;
(function (EPersonalInfoActions) {
    EPersonalInfoActions["LOAD_PERSONAL_INFO"] = "[PersonalInfo] Load Personal Info";
    EPersonalInfoActions["LOAD_PERSONAL_INFO_SUCCESS"] = "[PersonalInfo] Load Personal Info Success";
    EPersonalInfoActions["LOAD_PERSONAL_INFO_FAIL"] = "[PersonalInfo] Load Personal Info Fail";
    EPersonalInfoActions["SUBMIT_PERSONAL_INFO"] = "[PersonalInfo] Submit Personal Info";
    EPersonalInfoActions["SUBMIT_PERSONAL_INFO_SUCCESS"] = "[PersonalInfo] Submit PersonalInfo Success";
    EPersonalInfoActions["SUBMIT_PERSONAL_INFO_FAIL"] = "[PersonalInfo] Submit Personal Info Fail";
})(EPersonalInfoActions || (EPersonalInfoActions = {}));
var LoadPersonalInfo = /** @class */ (function () {
    function LoadPersonalInfo() {
        this.type = EPersonalInfoActions.LOAD_PERSONAL_INFO;
    }
    return LoadPersonalInfo;
}());
export { LoadPersonalInfo };
var LoadPersonalInfoSuccess = /** @class */ (function () {
    // Passing a payload of type IPersonalInfo which holds the personal info information
    function LoadPersonalInfoSuccess(payload) {
        this.payload = payload;
        this.type = EPersonalInfoActions.LOAD_PERSONAL_INFO_SUCCESS;
    }
    return LoadPersonalInfoSuccess;
}());
export { LoadPersonalInfoSuccess };
var LoadPersonalInfoFail = /** @class */ (function () {
    // Passing a payload of type IAppError
    function LoadPersonalInfoFail(payload) {
        this.payload = payload;
        this.type = EPersonalInfoActions.LOAD_PERSONAL_INFO_FAIL;
    }
    return LoadPersonalInfoFail;
}());
export { LoadPersonalInfoFail };
var SubmitPersonalInfo = /** @class */ (function () {
    function SubmitPersonalInfo(payload) {
        this.payload = payload;
        this.type = EPersonalInfoActions.SUBMIT_PERSONAL_INFO;
    }
    return SubmitPersonalInfo;
}());
export { SubmitPersonalInfo };
var SubmitPersonalInfoSuccess = /** @class */ (function () {
    function SubmitPersonalInfoSuccess(payload) {
        this.payload = payload;
        this.type = EPersonalInfoActions.SUBMIT_PERSONAL_INFO_SUCCESS;
    }
    return SubmitPersonalInfoSuccess;
}());
export { SubmitPersonalInfoSuccess };
var SubmitPersonalInfoFail = /** @class */ (function () {
    function SubmitPersonalInfoFail(payload) {
        this.payload = payload;
        this.type = EPersonalInfoActions.SUBMIT_PERSONAL_INFO_FAIL;
    }
    return SubmitPersonalInfoFail;
}());
export { SubmitPersonalInfoFail };
//# sourceMappingURL=personalInfo.actions.js.map