export var EErrorType;
(function (EErrorType) {
    EErrorType["LOAD"] = "load";
    EErrorType["SUBMIT"] = "submit";
})(EErrorType || (EErrorType = {}));
export var ESnackbarAction;
(function (ESnackbarAction) {
    ESnackbarAction["REFRESH"] = "Refresh";
    ESnackbarAction["DISMISS"] = "Dismiss";
    ESnackbarAction["NAVIGATE"] = "Go";
})(ESnackbarAction || (ESnackbarAction = {}));
var OpenSubmitErrorBar = /** @class */ (function () {
    function OpenSubmitErrorBar(message, callback, action) {
        if (message === void 0) { message = 'There was an issue submitting the form. Please try again'; }
        if (callback === void 0) { callback = null; }
        if (action === void 0) { action = ESnackbarAction.DISMISS; }
        this.message = message;
        this.callback = callback;
        this.action = action;
    }
    return OpenSubmitErrorBar;
}());
export { OpenSubmitErrorBar };
var OpenLoadErrorBar = /** @class */ (function () {
    function OpenLoadErrorBar(message, callback, action) {
        if (message === void 0) { message = 'There was an issue loading the form. Please try again'; }
        if (callback === void 0) { callback = null; }
        if (action === void 0) { action = ESnackbarAction.REFRESH; }
        this.message = message;
        this.callback = callback;
        this.action = action;
    }
    return OpenLoadErrorBar;
}());
export { OpenLoadErrorBar };
var AppSubmitError = /** @class */ (function () {
    function AppSubmitError(id, message, type) {
        if (id === void 0) { id = 'AA32'; }
        if (message === void 0) { message = 'something went wrong, please try again later..'; }
        if (type === void 0) { type = EErrorType.SUBMIT; }
        this.id = id;
        this.message = message;
        this.type = type;
    }
    return AppSubmitError;
}());
export { AppSubmitError };
var AppLoadError = /** @class */ (function () {
    function AppLoadError(id, message, type) {
        if (id === void 0) { id = 'AA32'; }
        if (message === void 0) { message = 'something went wrong, please try again later..'; }
        if (type === void 0) { type = EErrorType.LOAD; }
        this.id = id;
        this.message = message;
        this.type = type;
    }
    return AppLoadError;
}());
export { AppLoadError };
var InfoMissingError = /** @class */ (function () {
    function InfoMissingError(id, message) {
        if (id === void 0) { id = '1'; }
        if (message === void 0) { message = 'critical info is missing, please try again.'; }
        this.id = id;
        this.message = message;
    }
    return InfoMissingError;
}());
export { InfoMissingError };
var PhoneNumber = /** @class */ (function () {
    function PhoneNumber(countryCode, number) {
        if (countryCode === void 0) { countryCode = ''; }
        if (number === void 0) { number = ''; }
        this.countryCode = countryCode;
        this.number = number;
    }
    return PhoneNumber;
}());
export { PhoneNumber };
export var ENGLISH_LANGUAGE_INSTITUTE = {
    programCode: 'ELI',
    programDesc: 'English Language Institute',
    campus: 'NH',
    acadPlan: 'ELI',
    acadCareer: 'ESD'
};
// TODO: use this whenever a route is used instead of hardcoding routes
export var routeList = {
    application: {
        path: 'application',
        children: {
            personalInfo: 'personal-info',
            programList: 'program-availability',
            englishProf: 'english-proficiency',
            programChoice: 'program-choice',
            academicInfo: 'academic-info',
            documentUpload: 'file-up',
            infoRelease: 'info-release',
            review: 'review-submit',
            payment: 'payment'
        }
    },
    complete: 'complete'
};
export var ApplicationStatusObject = {
    new: {
        value: 'new',
        text: 'Not Submitted'
    },
    paid: {
        value: 'paid',
        text: 'Submitted - Under Review'
    },
    complete: {
        value: 'complete',
        text: 'Completed'
    },
    unknown: {
        value: null,
        text: 'Unknown'
    }
};
//# sourceMappingURL=shared.models.js.map