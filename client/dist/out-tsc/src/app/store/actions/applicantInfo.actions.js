//  Enumeration defining the different actions
export var EApplicantInfoActions;
(function (EApplicantInfoActions) {
    EApplicantInfoActions["LOAD_APPLICANT_INFO"] = "[ApplicantInfo] Load Applicant Info";
    EApplicantInfoActions["LOAD_APPLICANT_INFO_SUCCESS"] = "[ApplicantInfo] Load Applicant Info Success";
    EApplicantInfoActions["LOAD_APPLICANT_INFO_FAIL"] = "[ApplicantInfo] Load Applicant Info Fail";
    EApplicantInfoActions["RESET_APPLICANT_INFO"] = "[ApplicantInfo] Reset Application Info";
})(EApplicantInfoActions || (EApplicantInfoActions = {}));
var LoadApplicantInfo = /** @class */ (function () {
    function LoadApplicantInfo(payload) {
        if (payload === void 0) { payload = null; }
        this.payload = payload;
        this.type = EApplicantInfoActions.LOAD_APPLICANT_INFO;
    }
    return LoadApplicantInfo;
}());
export { LoadApplicantInfo };
var LoadApplicantInfoSuccess = /** @class */ (function () {
    function LoadApplicantInfoSuccess(payload) {
        this.payload = payload;
        this.type = EApplicantInfoActions.LOAD_APPLICANT_INFO_SUCCESS;
    }
    return LoadApplicantInfoSuccess;
}());
export { LoadApplicantInfoSuccess };
var LoadApplicantInfoFail = /** @class */ (function () {
    function LoadApplicantInfoFail(payload) {
        this.payload = payload;
        this.type = EApplicantInfoActions.LOAD_APPLICANT_INFO_FAIL;
    }
    return LoadApplicantInfoFail;
}());
export { LoadApplicantInfoFail };
var ResetApplicantInfo = /** @class */ (function () {
    function ResetApplicantInfo(payload) {
        if (payload === void 0) { payload = null; }
        this.payload = payload;
        this.type = EApplicantInfoActions.RESET_APPLICANT_INFO;
    }
    return ResetApplicantInfo;
}());
export { ResetApplicantInfo };
//# sourceMappingURL=applicantInfo.actions.js.map