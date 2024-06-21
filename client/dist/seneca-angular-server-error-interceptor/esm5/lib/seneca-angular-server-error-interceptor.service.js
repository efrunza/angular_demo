/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ ServerErrorInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function ServerErrorInterceptor_Factory() { return new ServerErrorInterceptor(); }, token: ServerErrorInterceptor, providedIn: "root" });
    return ServerErrorInterceptor;
}());
export { ServerErrorInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZWNhLWFuZ3VsYXItc2VydmVyLWVycm9yLWludGVyY2VwdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZW5lY2EtYW5ndWxhci1zZXJ2ZXItZXJyb3ItaW50ZXJjZXB0b3IvIiwic291cmNlcyI6WyJsaWIvc2VuZWNhLWFuZ3VsYXItc2VydmVyLWVycm9yLWludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUVuRDtJQUFBO0tBb0JDOzs7Ozs7SUFaQywwQ0FBUzs7Ozs7SUFBVCxVQUNFLEdBQXFCLEVBQ3JCLElBQWlCO1FBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ1IsVUFBVTs7OztRQUFDLFVBQUMsS0FBd0I7WUFDbEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2dCQW5CRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7aUNBYkQ7Q0ErQkMsQUFwQkQsSUFvQkM7U0FiWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCByZXRyeSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbi8qKlxuICogaW50ZXJjZXB0IGV2ZXJ5IHNpbmdsZSBzZXJ2ZXIgY2FsbCwgcmV0cnkgb25jZSBhbmQgcmV0aHJvdyB0aGUgZXJyb3IgaWYgaXQgcGVyc2lzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZlckVycm9ySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zb2xlLmxvZyhcInVzaW5nIHNlbmVjYS1hbmd1bGFyLXNlcnZlci1lcnJvci1pbnRlcmNlcHRvclwiKTtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKFxuICAgICAgcmV0cnkoMSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=