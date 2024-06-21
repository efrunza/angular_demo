import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var ProgramChoiceService = /** @class */ (function () {
    function ProgramChoiceService(http) {
        var _this = this;
        this.http = http;
        this.getProgramChoices = function () {
            return _this.http.get(environment.apiUrl + "/getProgramChoice");
        };
        this.postProgramChoices = function (programChoices) {
            return _this.http.post(environment.apiUrl + "/AddProgramChoice", programChoices);
        };
    }
    ProgramChoiceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ProgramChoiceService);
    return ProgramChoiceService;
}());
export { ProgramChoiceService };
//# sourceMappingURL=program-choice.service.js.map