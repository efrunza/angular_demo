export var EEnglishProficiencyActions;
(function (EEnglishProficiencyActions) {
    EEnglishProficiencyActions["LOAD_ENGLISH_PROFICIENCY"] = "[EnglishProficiency] LOAD";
    EEnglishProficiencyActions["LOAD_ENGLISH_PROFICIENCY_SUCCESS"] = "[EnglishProficiency] LOAD SUCCESS";
    EEnglishProficiencyActions["LOAD_ENGLISH_PROFICIENCY_FAIL"] = "[EnglishProficiency] LOAD FAIL";
    EEnglishProficiencyActions["SUBMIT_ENGLISH_PROFICIENCY"] = "[EnglishProficiency] SUBMIT";
    EEnglishProficiencyActions["SUBMIT_ENGLISH_PROFICIENCY_SUCCESS"] = "[EnglishProficiency] SUBMIT SUCCESS";
    EEnglishProficiencyActions["SUBMIT_ENGLISH_PROFICIENCY_FAIL"] = "[EnglishProficiency] SUBMIT FAIL";
})(EEnglishProficiencyActions || (EEnglishProficiencyActions = {}));
var LoadEnglishProficiency = /** @class */ (function () {
    function LoadEnglishProficiency() {
        this.type = EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY;
    }
    return LoadEnglishProficiency;
}());
export { LoadEnglishProficiency };
var LoadEnglishProficiencySuccess = /** @class */ (function () {
    function LoadEnglishProficiencySuccess(payload) {
        this.payload = payload;
        this.type = EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY_SUCCESS;
    }
    return LoadEnglishProficiencySuccess;
}());
export { LoadEnglishProficiencySuccess };
var LoadEnglishProficiencyFail = /** @class */ (function () {
    function LoadEnglishProficiencyFail(payload) {
        this.payload = payload;
        this.type = EEnglishProficiencyActions.LOAD_ENGLISH_PROFICIENCY_FAIL;
    }
    return LoadEnglishProficiencyFail;
}());
export { LoadEnglishProficiencyFail };
var SubmitEnglishProficiency = /** @class */ (function () {
    function SubmitEnglishProficiency(payload) {
        this.payload = payload;
        this.type = EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY;
    }
    return SubmitEnglishProficiency;
}());
export { SubmitEnglishProficiency };
var SubmitEnglishProficiencySuccess = /** @class */ (function () {
    function SubmitEnglishProficiencySuccess(payload) {
        this.payload = payload;
        this.type = EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY_SUCCESS;
    }
    return SubmitEnglishProficiencySuccess;
}());
export { SubmitEnglishProficiencySuccess };
var SubmitEnglishProficiencyFail = /** @class */ (function () {
    function SubmitEnglishProficiencyFail(payload) {
        this.payload = payload;
        this.type = EEnglishProficiencyActions.SUBMIT_ENGLISH_PROFICIENCY_FAIL;
    }
    return SubmitEnglishProficiencyFail;
}());
export { SubmitEnglishProficiencyFail };
//# sourceMappingURL=englishProficiency.actions.js.map