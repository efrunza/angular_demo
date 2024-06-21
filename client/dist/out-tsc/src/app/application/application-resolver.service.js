import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'app/application/application.service';
var ApplicationResolverService = /** @class */ (function () {
    function ApplicationResolverService(router, applicationService) {
        this.router = router;
        this.applicationService = applicationService;
    }
    // TODO: complete logic and implement in app routing module
    ApplicationResolverService.prototype.resolve = function (route, state) {
        return this.applicationService.getLastStep();
        // // the payment page expects a redirect from the online banking page with certain parameters therefore we need to allow the redirect in that case
        // // better practice is to handle this in router guards but we need to start lazy loading children of the "/application" route first
        // else if (
        //   (activatedRoute.match('payment') && this.applicationService.lastStep >= 8) ||
        //   activatedRoute.match('payment?')
        // ) {
        //   canResolve = true;
        // } else if (activatedRoute.match('complete') && this.applicationService.lastStep === 9) {
        //   canResolve = true;
        // } else {
        // }
        // }
    };
    ApplicationResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ApplicationService])
    ], ApplicationResolverService);
    return ApplicationResolverService;
}());
export { ApplicationResolverService };
//# sourceMappingURL=application-resolver.service.js.map