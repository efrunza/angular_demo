//  Enumeration defining the different actions
export var ECountryListActions;
(function (ECountryListActions) {
    ECountryListActions["LOAD_COUNTRY_LIST"] = "[CountryList] Load Country List";
    ECountryListActions["LOAD_COUNTRY_LIST_SUCCESS"] = "[CountryList] Load Country List Success";
    ECountryListActions["LOAD_COUNTRY_LIST_FAIL"] = "[CountryList] Load Country List Fail";
})(ECountryListActions || (ECountryListActions = {}));
var LoadCountryList = /** @class */ (function () {
    function LoadCountryList() {
        this.type = ECountryListActions.LOAD_COUNTRY_LIST;
    }
    return LoadCountryList;
}());
export { LoadCountryList };
var LoadCountryListSuccess = /** @class */ (function () {
    // Passing a payload of type ICountry[] which holds the Country information
    function LoadCountryListSuccess(payload) {
        this.payload = payload;
        this.type = ECountryListActions.LOAD_COUNTRY_LIST_SUCCESS;
    }
    return LoadCountryListSuccess;
}());
export { LoadCountryListSuccess };
var LoadCountryListFail = /** @class */ (function () {
    // Passing a payload of type IAppError
    function LoadCountryListFail(payload) {
        this.payload = payload;
        this.type = ECountryListActions.LOAD_COUNTRY_LIST_FAIL;
    }
    return LoadCountryListFail;
}());
export { LoadCountryListFail };
//# sourceMappingURL=countryList.actions.js.map