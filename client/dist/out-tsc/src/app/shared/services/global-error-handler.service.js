import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
var GlobalErrorHandler = /** @class */ (function () {
    function GlobalErrorHandler(injector) {
        this.injector = injector;
    }
    /**
     * intercept every http call and log error
     */
    GlobalErrorHandler.prototype.handleError = function (error) {
        var logger = this.injector.get(NGXLogger);
        if (error instanceof HttpErrorResponse) {
            logger.error(error.message, "serverErrorId: " + error.error.id, "serverErrorMessage: " + error.error.message);
        }
        else {
            logger.error(error.message, error.stack);
        }
    };
    GlobalErrorHandler = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Injector])
    ], GlobalErrorHandler);
    return GlobalErrorHandler;
}());
export { GlobalErrorHandler };
//# sourceMappingURL=global-error-handler.service.js.map