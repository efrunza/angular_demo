import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MsalGuard, MsalService } from '@azure/msal-angular';
import { AuthService } from './auth.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, msalGuard, msalService) {
        this.authService = authService;
        this.msalGuard = msalGuard;
        this.msalService = msalService;
    }
    // TODO:This function can be made simpler by separating the logic for initial login authentication, applicant authentication and agent authentication into 3 separate guards
    AuthGuard.prototype.canActivate = function (route, state) {
        /*
        const targetUrl = state.url;
        const userInfo = this.authService.getUserInfo();
        if (userInfo) {
          if (
            userInfo.tfp === commonEnv.agentSignInPolicy &&
            Object.entries(route.queryParams).length === 0
          ) {
            //   TODO: This is to prevent agents from landing on application pages on refresh (since we need to load agent data first)
            // Add this to application guard and check against agent policy + firstLogInDone in storage - loops on activation
            // if (targetUrl.match(`/${commonEnv.azureApplicantCallbackUrl}`) && ) {
            //   this.router.navigate(['/agent/application-list']);
            // }
          } else if (userInfo.tfp === commonEnv.applicantSignInPolicy) {
            // TODO: this is to prevent regular applicants from landing on agent pages - loops on activation
            // if (targetUrl.match(`/${commonEnv.azureAgentCallbackUrl}`)) {
            //   this.router.navigate(['/application']);
            // }
            // this.router.navigate(['/application']);
            return false;
          }
          return true;
        } else {
          if (targetUrl.match(`/${commonEnv.azureAgentCallbackUrl}`)) {
            this.msalService.authority = environment.msalAgentConfigs.authority;
          }
          return this.msalGuard.canActivate(route, state);
        }
        */
        return true;
    };
    AuthGuard.prototype.canLoad = function (route, segments) {
        /*
        if (this.authService.isAuthenticated()) {
          return true;
        } else {
          return false;
        }
        */
        return true;
    };
    /* TODO: use something like this func to cleanup the canActivate function (source: Angular official documents)
    checkLogin(url: string): boolean {
      if (this.authService.isAuthenticated()) { return this.msalGuard.canActivate(route, state); }
  
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
  
      // Create a dummy session id
      // const sessionId = 123456789;
  
      // Set our navigation extras object
      // that contains our global query params and fragment
      // const navigationExtras: NavigationExtras = {
      //   queryParams: { 'session_id': sessionId },
      //   fragment: 'anchor'
      // };
  
      // Navigate to the login page with extras
      // this.router.navigate(['/login'], navigationExtras);
      this.router.navigate(['/']);
      return false;
    }
    */
    AuthGuard.prototype.ngOnDestroy = function () { };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            MsalGuard,
            MsalService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map