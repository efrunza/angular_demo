import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Injectable, Injector, Component, NgModule, defineInjectable, inject, INJECTOR } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ SenecaAngularErrorHandlerService.ngInjectableDef = defineInjectable({ factory: function SenecaAngularErrorHandlerService_Factory() { return new SenecaAngularErrorHandlerService(inject(INJECTOR)); }, token: SenecaAngularErrorHandlerService, providedIn: "root" });
    return SenecaAngularErrorHandlerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SenecaAngularErrorHandlerComponent = /** @class */ (function () {
    function SenecaAngularErrorHandlerComponent() {
    }
    /**
     * @return {?}
     */
    SenecaAngularErrorHandlerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    SenecaAngularErrorHandlerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-seneca-angular-error-handler',
                    template: "\n    <p>\n      seneca-angular-error-handler works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    SenecaAngularErrorHandlerComponent.ctorParameters = function () { return []; };
    return SenecaAngularErrorHandlerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SenecaAngularErrorHandlerModule = /** @class */ (function () {
    function SenecaAngularErrorHandlerModule() {
    }
    SenecaAngularErrorHandlerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SenecaAngularErrorHandlerComponent],
                    imports: [],
                    exports: [SenecaAngularErrorHandlerComponent]
                },] }
    ];
    return SenecaAngularErrorHandlerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SenecaAngularErrorHandlerService, SenecaAngularErrorHandlerComponent, SenecaAngularErrorHandlerModule };

//# sourceMappingURL=seneca-angular-error-handler.js.map