import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var LanguageListService = /** @class */ (function () {
    function LanguageListService(http) {
        var _this = this;
        this.http = http;
        // function 'get's a list of International Languages from the API
        this.getLanguageList = function () {
            return _this.http
                .get(environment.apiUrl + "/getLanguageCodes")
                // Getting the array of languages from the QasData Container
                .pipe(map(function (response) { return response['QasData']; }));
        };
    }
    LanguageListService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LanguageListService);
    return LanguageListService;
}());
export { LanguageListService };
//# sourceMappingURL=language-list.service.js.map