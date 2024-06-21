/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import * as i0 from "@angular/core";
export class SenecaAngularErrorHandlerService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        /** @type {?} */
        const logger = this.injector.get(NGXLogger);
        if (error instanceof HttpErrorResponse) {
            logger.error(error.message, `SenecaErrorHandler: serverErrorId: ${error.error.id}`, `SenecaErrorHandler: serverErrorMessage: ${error.error.message}`);
        }
        else {
            logger.error("SenecaErrorHandler: " + error.message, "SenecaErrorHandler: " + error.stack);
        }
    }
}
SenecaAngularErrorHandlerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SenecaAngularErrorHandlerService.ctorParameters = () => [
    { type: Injector }
];
/** @nocollapse */ SenecaAngularErrorHandlerService.ngInjectableDef = i0.defineInjectable({ factory: function SenecaAngularErrorHandlerService_Factory() { return new SenecaAngularErrorHandlerService(i0.inject(i0.INJECTOR)); }, token: SenecaAngularErrorHandlerService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    SenecaAngularErrorHandlerService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZWNhLWFuZ3VsYXItZXJyb3ItaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2VuZWNhLWFuZ3VsYXItZXJyb3ItaGFuZGxlci8iLCJzb3VyY2VzIjpbImxpYi9zZW5lY2EtYW5ndWxhci1lcnJvci1oYW5kbGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDOztBQUt2QyxNQUFNLE9BQU8sZ0NBQWdDOzs7O0lBRTNDLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBRyxDQUFDOzs7OztJQUUxQyxXQUFXLENBQUMsS0FBZ0M7O2NBQ3BDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFFM0MsSUFBSSxLQUFLLFlBQVksaUJBQWlCLEVBQUU7WUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FDVixLQUFLLENBQUMsT0FBTyxFQUNiLHNDQUFzQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUN0RCwyQ0FBMkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FDakUsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVGO0lBQ0gsQ0FBQzs7O1lBbkJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQU5rQyxRQUFROzs7Ozs7OztJQVM3QixvREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5HWExvZ2dlciB9IGZyb20gJ25neC1sb2dnZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW5lY2FBbmd1bGFyRXJyb3JIYW5kbGVyU2VydmljZSAgaW1wbGVtZW50cyBFcnJvckhhbmRsZXIge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIGhhbmRsZUVycm9yKGVycm9yOiBFcnJvciB8IEh0dHBFcnJvclJlc3BvbnNlKTogdm9pZCB7XG4gICAgY29uc3QgbG9nZ2VyID0gdGhpcy5pbmplY3Rvci5nZXQoTkdYTG9nZ2VyKTtcblxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIGBTZW5lY2FFcnJvckhhbmRsZXI6IHNlcnZlckVycm9ySWQ6ICR7ZXJyb3IuZXJyb3IuaWR9YCxcbiAgICAgICAgYFNlbmVjYUVycm9ySGFuZGxlcjogc2VydmVyRXJyb3JNZXNzYWdlOiAke2Vycm9yLmVycm9yLm1lc3NhZ2V9YFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmVycm9yKFwiU2VuZWNhRXJyb3JIYW5kbGVyOiBcIiArIGVycm9yLm1lc3NhZ2UsIFwiU2VuZWNhRXJyb3JIYW5kbGVyOiBcIiArIGVycm9yLnN0YWNrKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==