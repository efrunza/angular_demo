import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
var ServerErrorInterceptor = /** @class */ (function () {
    /**
     * intercept every single server call, retry once and rethrow the error if it persists
     */
    function ServerErrorInterceptor() {
    }
    ServerErrorInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req).pipe(retry(1), catchError(function (error) {
            return throwError(error);
        }));
    };
    ServerErrorInterceptor = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
        /**
         * intercept every single server call, retry once and rethrow the error if it persists
         */
    ], ServerErrorInterceptor);
    return ServerErrorInterceptor;
}());
export { ServerErrorInterceptor };
//# sourceMappingURL=server-error-interceptor.service.js.map