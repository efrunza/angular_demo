/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import * as i0 from "@angular/core";
var SenecaAngularErrorHandlerService = /** @class */ (function () {
    function SenecaAngularErrorHandlerService(injector) {
        this.injector = injector;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    SenecaAngularErrorHandlerService.prototype.handleError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        /** @type {?} */
        var logger = this.injector.get(NGXLogger);
        if (error instanceof HttpErrorResponse) {
            logger.error(error.message, "SenecaErrorHandler: serverErrorId: " + error.error.id, "SenecaErrorHandler: serverErrorMessage: " + error.error.message);
        }
        else {
            logger.error("SenecaErrorHandler: " + error.message, "SenecaErrorHandler: " + error.stack);
        }
    };
    SenecaAngularErrorHandlerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SenecaAngularErrorHandlerService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    /** @nocollapse */ SenecaAngularErrorHandlerService.ngInjectableDef = i0.defineInjectable({ factory: function SenecaAngularErrorHandlerService_Factory() { return new SenecaAngularErrorHandlerService(i0.inject(i0.INJECTOR)); }, token: SenecaAngularErrorHandlerService, providedIn: "root" });
    return SenecaAngularErrorHandlerService;
}());
export { SenecaAngularErrorHandlerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SenecaAngularErrorHandlerService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZWNhLWFuZ3VsYXItZXJyb3ItaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2VuZWNhLWFuZ3VsYXItZXJyb3ItaGFuZGxlci8iLCJzb3VyY2VzIjpbImxpYi9zZW5lY2EtYW5ndWxhci1lcnJvci1oYW5kbGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDOztBQUV2QztJQUtFLDBDQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQzs7Ozs7SUFFMUMsc0RBQVc7Ozs7SUFBWCxVQUFZLEtBQWdDOztZQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBRTNDLElBQUksS0FBSyxZQUFZLGlCQUFpQixFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQ1YsS0FBSyxDQUFDLE9BQU8sRUFDYix3Q0FBc0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFJLEVBQ3RELDZDQUEyQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQVMsQ0FDakUsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVGO0lBQ0gsQ0FBQzs7Z0JBbkJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTmtDLFFBQVE7OzsyQ0FBM0M7Q0F3QkMsQUFwQkQsSUFvQkM7U0FqQlksZ0NBQWdDOzs7Ozs7SUFFL0Isb0RBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOR1hMb2dnZXIgfSBmcm9tICduZ3gtbG9nZ2VyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VuZWNhQW5ndWxhckVycm9ySGFuZGxlclNlcnZpY2UgIGltcGxlbWVudHMgRXJyb3JIYW5kbGVyIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBoYW5kbGVFcnJvcihlcnJvcjogRXJyb3IgfCBIdHRwRXJyb3JSZXNwb25zZSk6IHZvaWQge1xuICAgIGNvbnN0IGxvZ2dlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KE5HWExvZ2dlcik7XG5cbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBlcnJvci5tZXNzYWdlLFxuICAgICAgICBgU2VuZWNhRXJyb3JIYW5kbGVyOiBzZXJ2ZXJFcnJvcklkOiAke2Vycm9yLmVycm9yLmlkfWAsXG4gICAgICAgIGBTZW5lY2FFcnJvckhhbmRsZXI6IHNlcnZlckVycm9yTWVzc2FnZTogJHtlcnJvci5lcnJvci5tZXNzYWdlfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIlNlbmVjYUVycm9ySGFuZGxlcjogXCIgKyBlcnJvci5tZXNzYWdlLCBcIlNlbmVjYUVycm9ySGFuZGxlcjogXCIgKyBlcnJvci5zdGFjayk7XG4gICAgfVxuICB9XG59XG4iXX0=