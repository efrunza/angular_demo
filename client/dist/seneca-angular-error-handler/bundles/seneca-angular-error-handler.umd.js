(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('ngx-logger'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('seneca-angular-error-handler', ['exports', '@angular/common/http', 'ngx-logger', '@angular/core'], factory) :
    (factory((global['seneca-angular-error-handler'] = {}),global.ng.common.http,global.ngxLogger,global.ng.core));
}(this, (function (exports,http,ngxLogger,i0) { 'use strict';

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
                var logger = this.injector.get(ngxLogger.NGXLogger);
                if (error instanceof http.HttpErrorResponse) {
                    logger.error(error.message, "SenecaErrorHandler: serverErrorId: " + error.error.id, "SenecaErrorHandler: serverErrorMessage: " + error.error.message);
                }
                else {
                    logger.error("SenecaErrorHandler: " + error.message, "SenecaErrorHandler: " + error.stack);
                }
            };
        SenecaAngularErrorHandlerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SenecaAngularErrorHandlerService.ctorParameters = function () {
            return [
                { type: i0.Injector }
            ];
        };
        /** @nocollapse */ SenecaAngularErrorHandlerService.ngInjectableDef = i0.defineInjectable({ factory: function SenecaAngularErrorHandlerService_Factory() { return new SenecaAngularErrorHandlerService(i0.inject(i0.INJECTOR)); }, token: SenecaAngularErrorHandlerService, providedIn: "root" });
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
            { type: i0.Component, args: [{
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
            { type: i0.NgModule, args: [{
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

    exports.SenecaAngularErrorHandlerService = SenecaAngularErrorHandlerService;
    exports.SenecaAngularErrorHandlerComponent = SenecaAngularErrorHandlerComponent;
    exports.SenecaAngularErrorHandlerModule = SenecaAngularErrorHandlerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=seneca-angular-error-handler.umd.js.map