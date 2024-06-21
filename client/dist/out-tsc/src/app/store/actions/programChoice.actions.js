export var EProgramChoiceActions;
(function (EProgramChoiceActions) {
    EProgramChoiceActions["LOAD_PROGRAM_CHOICES"] = "[ProgramChoices] LOAD";
    EProgramChoiceActions["LOAD_PROGRAM_CHOICES_SUCCESS"] = "[ProgramChoices] LOAD SUCCESS";
    EProgramChoiceActions["LOAD_PROGRAM_CHOICES_FAIL"] = "[ProgramChoices] LOAD FAIL";
    EProgramChoiceActions["SUBMIT_PROGRAM_CHOICES"] = "[ProgramChoices] SUBMIT";
    EProgramChoiceActions["SUBMIT_PROGRAM_CHOICES_SUCCESS"] = "[ProgramChoices] SUBMIT SUCCESS";
    EProgramChoiceActions["SUBMIT_PROGRAM_CHOICES_FAIL"] = "[ProgramChoices] SUBMIT FAIL";
})(EProgramChoiceActions || (EProgramChoiceActions = {}));
var LoadProgramChoices = /** @class */ (function () {
    function LoadProgramChoices() {
        this.type = EProgramChoiceActions.LOAD_PROGRAM_CHOICES;
    }
    return LoadProgramChoices;
}());
export { LoadProgramChoices };
var LoadProgramChoicesSuccess = /** @class */ (function () {
    function LoadProgramChoicesSuccess(payload) {
        this.payload = payload;
        this.type = EProgramChoiceActions.LOAD_PROGRAM_CHOICES_SUCCESS;
    }
    return LoadProgramChoicesSuccess;
}());
export { LoadProgramChoicesSuccess };
var LoadProgramChoicesFail = /** @class */ (function () {
    function LoadProgramChoicesFail(payload) {
        this.payload = payload;
        this.type = EProgramChoiceActions.LOAD_PROGRAM_CHOICES_FAIL;
    }
    return LoadProgramChoicesFail;
}());
export { LoadProgramChoicesFail };
var SubmitProgramChoices = /** @class */ (function () {
    function SubmitProgramChoices(payload) {
        this.payload = payload;
        this.type = EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES;
    }
    return SubmitProgramChoices;
}());
export { SubmitProgramChoices };
var SubmitProgramChoicesSuccess = /** @class */ (function () {
    function SubmitProgramChoicesSuccess(payload) {
        this.payload = payload;
        this.type = EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES_SUCCESS;
    }
    return SubmitProgramChoicesSuccess;
}());
export { SubmitProgramChoicesSuccess };
var SubmitProgramChoicesFail = /** @class */ (function () {
    function SubmitProgramChoicesFail(payload) {
        this.payload = payload;
        this.type = EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES_FAIL;
    }
    return SubmitProgramChoicesFail;
}());
export { SubmitProgramChoicesFail };
//# sourceMappingURL=programChoice.actions.js.map