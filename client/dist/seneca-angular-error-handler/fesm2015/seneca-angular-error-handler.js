import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Injectable, Injector, Component, NgModule, defineInjectable, inject, INJECTOR } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SenecaAngularErrorHandlerService {
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
/** @nocollapse */ SenecaAngularErrorHandlerService.ngInjectableDef = defineInjectable({ factory: function SenecaAngularErrorHandlerService_Factory() { return new SenecaAngularErrorHandlerService(inject(INJECTOR)); }, token: SenecaAngularErrorHandlerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SenecaAngularErrorHandlerComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
SenecaAngularErrorHandlerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-seneca-angular-error-handler',
                template: `
    <p>
      seneca-angular-error-handler works!
    </p>
  `
            }] }
];
/** @nocollapse */
SenecaAngularErrorHandlerComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SenecaAngularErrorHandlerModule {
}
SenecaAngularErrorHandlerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SenecaAngularErrorHandlerComponent],
                imports: [],
                exports: [SenecaAngularErrorHandlerComponent]
            },] }
];

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