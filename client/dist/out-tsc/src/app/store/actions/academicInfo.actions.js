export var EAcademicInfoActions;
(function (EAcademicInfoActions) {
    EAcademicInfoActions["LOAD_ACADEMIC_INFO"] = "[AcademicInfo] LOAD";
    EAcademicInfoActions["LOAD_ACADEMIC_INFO_SUCCESS"] = "[AcademicInfo] LOAD SUCCESS";
    EAcademicInfoActions["LOAD_ACADEMIC_INFO_FAIL"] = "[AcademicInfo] LOAD FAIL";
    EAcademicInfoActions["SUBMIT_ACADEMIC_INFO"] = "[AcademicInfo] SUBMIT";
    EAcademicInfoActions["SUBMIT_ACADEMIC_INFO_SUCCESS"] = "[AcademicInfo] SUBMIT SUCCESS";
    EAcademicInfoActions["SUBMIT_ACADEMIC_INFO_FAIL"] = "[AcademicInfo] SUBMIT FAIL";
})(EAcademicInfoActions || (EAcademicInfoActions = {}));
var LoadAcademicInfo = /** @class */ (function () {
    function LoadAcademicInfo() {
        this.type = EAcademicInfoActions.LOAD_ACADEMIC_INFO;
    }
    return LoadAcademicInfo;
}());
export { LoadAcademicInfo };
var LoadAcademicInfoSuccess = /** @class */ (function () {
    function LoadAcademicInfoSuccess(payload) {
        this.payload = payload;
        this.type = EAcademicInfoActions.LOAD_ACADEMIC_INFO_SUCCESS;
    }
    return LoadAcademicInfoSuccess;
}());
export { LoadAcademicInfoSuccess };
var LoadAcademicInfoFail = /** @class */ (function () {
    function LoadAcademicInfoFail(payload) {
        this.payload = payload;
        this.type = EAcademicInfoActions.LOAD_ACADEMIC_INFO_FAIL;
    }
    return LoadAcademicInfoFail;
}());
export { LoadAcademicInfoFail };
var SubmitAcademicInfo = /** @class */ (function () {
    function SubmitAcademicInfo(payload) {
        this.payload = payload;
        this.type = EAcademicInfoActions.SUBMIT_ACADEMIC_INFO;
    }
    return SubmitAcademicInfo;
}());
export { SubmitAcademicInfo };
var SubmitAcademicInfoSuccess = /** @class */ (function () {
    function SubmitAcademicInfoSuccess(payload) {
        this.payload = payload;
        this.type = EAcademicInfoActions.SUBMIT_ACADEMIC_INFO_SUCCESS;
    }
    return SubmitAcademicInfoSuccess;
}());
export { SubmitAcademicInfoSuccess };
var SubmitAcademicInfoFail = /** @class */ (function () {
    function SubmitAcademicInfoFail(payload) {
        this.payload = payload;
        this.type = EAcademicInfoActions.SUBMIT_ACADEMIC_INFO_FAIL;
    }
    return SubmitAcademicInfoFail;
}());
export { SubmitAcademicInfoFail };
//# sourceMappingURL=academicInfo.actions.js.map