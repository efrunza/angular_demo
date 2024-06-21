import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
var InfoReleaseService = /** @class */ (function () {
    function InfoReleaseService(http) {
        var _this = this;
        this.http = http;
        this.loadInfoRelease = function () {
            return _this.http.get(environment.apiUrl + "/getCallReleaseInfo");
        };
        this.submitInfoRelease = function (data) {
            return _this.http.post(environment.apiUrl + "/addCallReleaseInfo", data);
        };
    }
    InfoReleaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], InfoReleaseService);
    return InfoReleaseService;
}());
export { InfoReleaseService };
//# sourceMappingURL=info-release.service.js.map