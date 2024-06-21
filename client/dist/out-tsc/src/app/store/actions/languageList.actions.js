//  Enumeration defining the different actions
export var ELanguageListActions;
(function (ELanguageListActions) {
    ELanguageListActions["LOAD_LANGUAGE_LIST"] = "[LanguageList] Load Language List";
    ELanguageListActions["LOAD_LANGUAGE_LIST_SUCCESS"] = "[LanguageList] Load Language List Success";
    ELanguageListActions["LOAD_LANGUAGE_LIST_FAIL"] = "[LanguageList] Load Language List Fail";
})(ELanguageListActions || (ELanguageListActions = {}));
var LoadLanguageList = /** @class */ (function () {
    function LoadLanguageList() {
        this.type = ELanguageListActions.LOAD_LANGUAGE_LIST;
    }
    return LoadLanguageList;
}());
export { LoadLanguageList };
var LoadLanguageListSuccess = /** @class */ (function () {
    // Passing a payload of type ILanguageList which holds the Language information
    function LoadLanguageListSuccess(payload) {
        this.payload = payload;
        this.type = ELanguageListActions.LOAD_LANGUAGE_LIST_SUCCESS;
    }
    return LoadLanguageListSuccess;
}());
export { LoadLanguageListSuccess };
var LoadLanguageListFail = /** @class */ (function () {
    // Passing a payload of type IAppError
    function LoadLanguageListFail(payload) {
        this.payload = payload;
        this.type = ELanguageListActions.LOAD_LANGUAGE_LIST_FAIL;
    }
    return LoadLanguageListFail;
}());
export { LoadLanguageListFail };
//# sourceMappingURL=languageList.actions.js.map