import * as tslib_1 from "tslib";
export var EExceptionTypes;
(function (EExceptionTypes) {
    EExceptionTypes["INFO_MISSING"] = "AAA112";
    EExceptionTypes["INVALID_AGENT_LOGIN"] = "AAA123";
    EExceptionTypes["INVALID_USER_INFO"] = "AAA125";
    EExceptionTypes["EXPIRED_AGENT"] = "AAA435";
    EExceptionTypes["UNABLE_TO_VERIFY_AGENT"] = "AAA543";
    EExceptionTypes["GENERAL_EXCEPTION"] = "ADS342";
})(EExceptionTypes || (EExceptionTypes = {}));
var InfoMissingException = /** @class */ (function (_super) {
    tslib_1.__extends(InfoMissingException, _super);
    function InfoMissingException(id, message) {
        if (id === void 0) { id = EExceptionTypes.INFO_MISSING; }
        if (message === void 0) { message = 'critical info is missing, please try again.'; }
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.message = message;
        Object.setPrototypeOf(_this, InfoMissingException.prototype);
        return _this;
    }
    return InfoMissingException;
}(Error));
export { InfoMissingException };
var InvalidAgentLoginException = /** @class */ (function (_super) {
    tslib_1.__extends(InvalidAgentLoginException, _super);
    function InvalidAgentLoginException(id, message) {
        if (id === void 0) { id = EExceptionTypes.INVALID_AGENT_LOGIN; }
        if (message === void 0) { message = 'invalid agent login'; }
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.message = message;
        Object.setPrototypeOf(_this, InvalidAgentLoginException.prototype);
        return _this;
    }
    return InvalidAgentLoginException;
}(Error));
export { InvalidAgentLoginException };
var InvalidUserInfoException = /** @class */ (function (_super) {
    tslib_1.__extends(InvalidUserInfoException, _super);
    function InvalidUserInfoException(id, message) {
        if (id === void 0) { id = EExceptionTypes.INVALID_USER_INFO; }
        if (message === void 0) { message = 'cannot add user info'; }
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.message = message;
        Object.setPrototypeOf(_this, InvalidUserInfoException.prototype);
        return _this;
    }
    return InvalidUserInfoException;
}(Error));
export { InvalidUserInfoException };
var ExpiredAgentException = /** @class */ (function (_super) {
    tslib_1.__extends(ExpiredAgentException, _super);
    function ExpiredAgentException(id, message) {
        if (id === void 0) { id = EExceptionTypes.EXPIRED_AGENT; }
        if (message === void 0) { message = 'the agent is expired'; }
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.message = message;
        Object.setPrototypeOf(_this, ExpiredAgentException.prototype);
        return _this;
    }
    return ExpiredAgentException;
}(Error));
export { ExpiredAgentException };
var UnableToVerifyAgentException = /** @class */ (function (_super) {
    tslib_1.__extends(UnableToVerifyAgentException, _super);
    function UnableToVerifyAgentException(id, message) {
        if (id === void 0) { id = EExceptionTypes.UNABLE_TO_VERIFY_AGENT; }
        if (message === void 0) { message = 'unable to verify agent'; }
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.message = message;
        Object.setPrototypeOf(_this, UnableToVerifyAgentException.prototype);
        return _this;
    }
    return UnableToVerifyAgentException;
}(Error));
export { UnableToVerifyAgentException };
var GeneralException = /** @class */ (function (_super) {
    tslib_1.__extends(GeneralException, _super);
    function GeneralException(id, message) {
        if (id === void 0) { id = EExceptionTypes.GENERAL_EXCEPTION; }
        if (message === void 0) { message = 'something went wrong.. please try again later'; }
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.message = message;
        Object.setPrototypeOf(_this, GeneralException.prototype);
        return _this;
    }
    return GeneralException;
}(Error));
export { GeneralException };
//# sourceMappingURL=exception.models.js.map