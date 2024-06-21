import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var ApplicantInfoService = /** @class */ (function () {
    function ApplicantInfoService(http) {
        var _this = this;
        this.http = http;
        // function 'get's the Applicant Info including appId and LastStep completed from the API
        this.getApplicantInfo = function (appId) {
            if (appId) {
                return _this.http.post(environment.apiUrl + "/getApplicationInfoAgent", appId !== '00000000000' ? { appId: appId } : { appId: null });
            }
            else {
                return _this.http.get(environment.apiUrl + "/getApplicationInfo");
            }
        };
    }
    ApplicantInfoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApplicantInfoService);
    return ApplicantInfoService;
}());
export { ApplicantInfoService };
//# sourceMappingURL=applicant-info.service.js.map