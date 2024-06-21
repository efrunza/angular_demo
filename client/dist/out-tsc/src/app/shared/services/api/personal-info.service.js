import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var PersonalInfoService = /** @class */ (function () {
    function PersonalInfoService(http) {
        var _this = this;
        this.http = http;
        // function 'get's the applicant personal information from the API
        this.getPersonalInfo = function () {
            return _this.http.get(environment.apiUrl + "/getApplicantBioData", {});
        };
        // function 'post's the applicant personal information to the API
        this.postPersonalInfo = function (personalInfo) {
            return _this.http.post(environment.apiUrl + "/storeApplicantBioData", personalInfo);
        };
    }
    PersonalInfoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PersonalInfoService);
    return PersonalInfoService;
}());
export { PersonalInfoService };
//# sourceMappingURL=personal-info.service.js.map