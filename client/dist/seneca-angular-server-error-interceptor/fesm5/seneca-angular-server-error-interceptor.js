import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, NgModule, Component, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ServerErrorInterceptor = /** @class */ (function () {
    function ServerErrorInterceptor() {
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    ServerErrorInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        console.log("using seneca-angular-server-error-interceptor");
        return next.handle(req).pipe(retry(1), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            return throwError(error);
        })));
    };
    ServerErrorInterceptor.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ ServerErrorInterceptor.ngInjectableDef = defineInjectable({ factory: function ServerErrorInterceptor_Factory() { return new ServerErrorInterceptor(); }, token: ServerErrorInterceptor, providedIn: "root" });
    return ServerErrorInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SenecaAngularServerErrorInterceptorComponent = /** @class */ (function () {
    function SenecaAngularServerErrorInterceptorComponent() {
    }
    /**
     * @return {?}
     */
    SenecaAngularServerErrorInterceptorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    SenecaAngularServerErrorInterceptorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-seneca-angular-server-error-interceptor',
                    template: "\n    <p>\n      seneca-angular-server-error-interceptor works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    SenecaAngularServerErrorInterceptorComponent.ctorParameters = function () { return []; };
    return SenecaAngularServerErrorInterceptorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SenecaAngularServerErrorInterceptorModule = /** @class */ (function () {
    function SenecaAngularServerErrorInterceptorModule() {
    }
    SenecaAngularServerErrorInterceptorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SenecaAngularServerErrorInterceptorComponent],
                    imports: [],
                    exports: [SenecaAngularServerErrorInterceptorComponent]
                },] }
    ];
    return SenecaAngularServerErrorInterceptorModule;
}());

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