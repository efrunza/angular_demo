export var EProgramListActions;
(function (EProgramListActions) {
    EProgramListActions["VIEW_PROGRAM_LIST_SUCCESS"] = "[ProgramList] VIEW PROGRAM LIST SUCCESS";
    EProgramListActions["LOAD_PROGRAMS"] = "[ProgramList] LOAD";
    EProgramListActions["LOAD_PROGRAM_SUCCESS"] = "[ProgramList] LOAD SUCCESS";
    EProgramListActions["LOAD_PROGRAM_FAIL"] = "[ProgramList] LOAD FAIL";
    EProgramListActions["RESET_PROGRAM_LIST"] = "[ProgramList] RESET";
})(EProgramListActions || (EProgramListActions = {}));
var LoadPrograms = /** @class */ (function () {
    function LoadPrograms(payload) {
        this.payload = payload;
        this.type = EProgramListActions.LOAD_PROGRAMS;
    }
    return LoadPrograms;
}());
export { LoadPrograms };
var LoadProgramsSuccess = /** @class */ (function () {
    function LoadProgramsSuccess(payload) {
        this.payload = payload;
        this.type = EProgramListActions.LOAD_PROGRAM_SUCCESS;
    }
    return LoadProgramsSuccess;
}());
export { LoadProgramsSuccess };
var LoadProgramsFail = /** @class */ (function () {
    function LoadProgramsFail(payload) {
        this.payload = payload;
        this.type = EProgramListActions.LOAD_PROGRAM_FAIL;
    }
    return LoadProgramsFail;
}());
export { LoadProgramsFail };
var ResetProgramList = /** @class */ (function () {
    function ResetProgramList() {
        this.type = EProgramListActions.RESET_PROGRAM_LIST;
    }
    return ResetProgramList;
}());
export { ResetProgramList };
var ViewProgramListSuccess = /** @class */ (function () {
    function ViewProgramListSuccess() {
        this.type = EProgramListActions.VIEW_PROGRAM_LIST_SUCCESS;
    }
    return ViewProgramListSuccess;
}());
export { ViewProgramListSuccess };
//# sourceMappingURL=programList.actions.js.map