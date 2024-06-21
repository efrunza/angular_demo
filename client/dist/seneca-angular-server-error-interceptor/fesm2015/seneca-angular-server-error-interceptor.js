import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, Component, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * intercept every single server call, retry once and rethrow the error if it persists
 */
class ServerErrorInterceptor {
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        console.log("using seneca-angular-server-error-interceptor");
        return next.handle(req).pipe(retry(1), catchError((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            return throwError(error);
        })));
    }
}
ServerErrorInterceptor.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ ServerErrorInterceptor.ngInjectableDef = defineInjectable({ factory: function ServerErrorInterceptor_Factory() { return new ServerErrorInterceptor(); }, token: ServerErrorInterceptor, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SenecaAngularServerErrorInterceptorComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
SenecaAngularServerErrorInterceptorComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-seneca-angular-server-error-interceptor',
                template: `
    <p>
      seneca-angular-server-error-interceptor works!
    </p>
  `
            }] }
];
/** @nocollapse */
SenecaAngularServerErrorInterceptorComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SenecaAngularServerErrorInterceptorModule {
}
SenecaAngularServerErrorInterceptorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SenecaAngularServerErrorInterceptorComponent],
                imports: [],
                exports: [SenecaAngularServerErrorInterceptorComponent]
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

export { ServerErrorInterceptor, SenecaAngularServerErrorInterceptorComponent, SenecaAngularServerErrorInterceptorModule };

//# sourceMappingURL=seneca-angular-server-error-interceptor.js.map