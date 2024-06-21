import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var ProgramListService = /** @class */ (function () {
    function ProgramListService(http) {
        var _this = this;
        this.http = http;
        this.getProgramLists = function (params) {
            if (params.year !== 0 && params.month !== 0) {
                return _this.http.post(environment.apiUrl + "/getAvailablePrograms", params);
            }
            else {
                return _this.http.get(environment.apiUrl + "/getAllPrograms");
            }
        };
    }
    ProgramListService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ProgramListService);
    return ProgramListService;
}());
export { ProgramListService };
//# sourceMappingURL=program-list.service.js.map