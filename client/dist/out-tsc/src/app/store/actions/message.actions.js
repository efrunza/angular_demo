export var EMessageActions;
(function (EMessageActions) {
    EMessageActions["DISPLAY_ERROR_MESSAGE"] = "[ERROR MESSAGE] DISPLAY";
    EMessageActions["CLOSE_ERROR_MESSAGE_ON_ROUTE_CHANGE"] = "[ERROR MESSAGE] CLOSE_ON_ROUTE_CHANGE";
    EMessageActions["DISPLAY_ERROR_DIALOG"] = "[ERROR MESSAGE] DISPLAY DIALOG";
})(EMessageActions || (EMessageActions = {}));
var DisplayErrorMessage = /** @class */ (function () {
    function DisplayErrorMessage(payload) {
        this.payload = payload;
        this.type = EMessageActions.DISPLAY_ERROR_MESSAGE;
    }
    return DisplayErrorMessage;
}());
export { DisplayErrorMessage };
var CloseErrorMessageOnRouteChange = /** @class */ (function () {
    function CloseErrorMessageOnRouteChange() {
        this.type = EMessageActions.CLOSE_ERROR_MESSAGE_ON_ROUTE_CHANGE;
    }
    return CloseErrorMessageOnRouteChange;
}());
export { CloseErrorMessageOnRouteChange };
var DisplayErrorDialog = /** @class */ (function () {
    function DisplayErrorDialog(payload) {
        this.payload = payload;
        this.type = EMessageActions.DISPLAY_ERROR_DIALOG;
    }
    return DisplayErrorDialog;
}());
export { DisplayErrorDialog };
//# sourceMappingURL=message.actions.js.map