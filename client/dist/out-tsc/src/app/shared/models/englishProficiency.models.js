export var EEliOption;
(function (EEliOption) {
    EEliOption["SUBMIT_SCORE"] = "1";
    EEliOption["ATTEND_ELI"] = "2";
    EEliOption["ATTEND_PARTNERSHIP_INSTITUTIONS"] = "3";
    EEliOption["NOT_APPLICABLE"] = "4";
})(EEliOption || (EEliOption = {}));
var EnglishProficiency = /** @class */ (function () {
    function EnglishProficiency(id, eliOption, test, partner, uploadDocument) {
        if (eliOption === void 0) { eliOption = null; }
        if (test === void 0) { test = null; }
        if (partner === void 0) { partner = null; }
        if (uploadDocument === void 0) { uploadDocument = false; }
        this.id = id;
        this.eliOption = eliOption;
        this.test = test;
        this.partner = partner;
        this.uploadDocument = uploadDocument;
    }
    return EnglishProficiency;
}());
export { EnglishProficiency };
//# sourceMappingURL=englishProficiency.models.js.map