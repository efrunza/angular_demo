export var EInfoReleaseActions;
(function (EInfoReleaseActions) {
    EInfoReleaseActions["LOAD_INFO_RELEASE"] = "[InfoRelease] Load Info Release";
    EInfoReleaseActions["LOAD_INFO_RELEASE_SUCCESS"] = "[InfoRelease] Load Info Release Success";
    EInfoReleaseActions["LOAD_INFO_RELEASE_FAIL"] = "[InfoRelease] Load Info Release Fail";
    EInfoReleaseActions["SUBMIT_INFO_RELEASE"] = "[InfoRelease] Submit Info Release";
    EInfoReleaseActions["SUBMIT_INFO_RELEASE_SUCCESS"] = "[InfoRelease] Submit Info Release Success";
    EInfoReleaseActions["SUBMIT_INFO_RELEASE_FAIL"] = "[InfoRelease] Submit Info Release Fail";
})(EInfoReleaseActions || (EInfoReleaseActions = {}));
var LoadInfoRelease = /** @class */ (function () {
    function LoadInfoRelease() {
        this.type = EInfoReleaseActions.LOAD_INFO_RELEASE;
    }
    return LoadInfoRelease;
}());
export { LoadInfoRelease };
var LoadInfoReleaseSuccess = /** @class */ (function () {
    function LoadInfoReleaseSuccess(payload) {
        this.payload = payload;
        this.type = EInfoReleaseActions.LOAD_INFO_RELEASE_SUCCESS;
    }
    return LoadInfoReleaseSuccess;
}());
export { LoadInfoReleaseSuccess };
var LoadInfoReleaseFail = /** @class */ (function () {
    function LoadInfoReleaseFail(payload) {
        this.payload = payload;
        this.type = EInfoReleaseActions.LOAD_INFO_RELEASE_FAIL;
    }
    return LoadInfoReleaseFail;
}());
export { LoadInfoReleaseFail };
var SubmitInfoRelease = /** @class */ (function () {
    function SubmitInfoRelease(payload) {
        this.payload = payload;
        this.type = EInfoReleaseActions.SUBMIT_INFO_RELEASE;
    }
    return SubmitInfoRelease;
}());
export { SubmitInfoRelease };
var SubmitInfoReleaseSuccess = /** @class */ (function () {
    function SubmitInfoReleaseSuccess(payload) {
        this.payload = payload;
        this.type = EInfoReleaseActions.SUBMIT_INFO_RELEASE_SUCCESS;
    }
    return SubmitInfoReleaseSuccess;
}());
export { SubmitInfoReleaseSuccess };
var SubmitInfoReleaseFail = /** @class */ (function () {
    function SubmitInfoReleaseFail(payload) {
        this.payload = payload;
        this.type = EInfoReleaseActions.SUBMIT_INFO_RELEASE_FAIL;
    }
    return SubmitInfoReleaseFail;
}());
export { SubmitInfoReleaseFail };
//# sourceMappingURL=infoRelease.actions.js.map