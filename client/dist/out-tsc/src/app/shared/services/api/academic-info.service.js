import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var AcademicInfoService = /** @class */ (function () {
    function AcademicInfoService(http) {
        var _this = this;
        this.http = http;
        this.getAcademicInfo = function () {
            return _this.http.get(environment.apiUrl + "/getAcademicInformation");
        };
        this.postAcademicInfo = function (academicInfo) {
            return _this.http.post(environment.apiUrl + "/AddAcademicInformation", academicInfo);
        };
    }
    AcademicInfoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AcademicInfoService);
    return AcademicInfoService;
}());
export { AcademicInfoService };
//# sourceMappingURL=academic-info.service.js.map