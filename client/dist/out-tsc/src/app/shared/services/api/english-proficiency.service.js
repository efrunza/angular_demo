import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var EnglishProficiencyService = /** @class */ (function () {
    function EnglishProficiencyService(http) {
        var _this = this;
        this.http = http;
        this.getEnglishProficiency = function () {
            return _this.http.get(environment.apiUrl + "/getEnglishProficiency");
        };
        this.postEnglishProficiency = function (englishProficiency) {
            return _this.http.post(environment.apiUrl + "/AddEnglishProficiency", englishProficiency);
        };
    }
    EnglishProficiencyService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EnglishProficiencyService);
    return EnglishProficiencyService;
}());
export { EnglishProficiencyService };
//# sourceMappingURL=english-proficiency.service.js.map