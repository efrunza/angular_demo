(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('seneca-angular-server-error-interceptor', ['exports', 'rxjs', 'rxjs/operators', '@angular/core'], factory) :
    (factory((global['seneca-angular-server-error-interceptor'] = {}),global.rxjs,global.rxjs.operators,global.ng.core));
}(this, (function (exports,rxjs,operators,i0) { 'use strict';

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
                return next.handle(req).pipe(operators.retry(1), operators.catchError(( /**
                 * @param {?} error
                 * @return {?}
                 */function (error) {
                    return rxjs.throwError(error);
                })));
            };
        ServerErrorInterceptor.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ ServerErrorInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function ServerErrorInterceptor_Factory() { return new ServerErrorInterceptor(); }, token: ServerErrorInterceptor, providedIn: "root" });
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
            { type: i0.Component, args: [{
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
            { type: i0.NgModule, args: [{
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

    exports.ServerErrorInterceptor = ServerErrorInterceptor;
    exports.SenecaAngularServerErrorInterceptorComponent = SenecaAngularServerErrorInterceptorComponent;
    exports.SenecaAngularServerErrorInterceptorModule = SenecaAngularServerErrorInterceptorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=seneca-angular-server-error-interceptor.umd.js.map