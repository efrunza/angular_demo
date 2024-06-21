import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var CountryListService = /** @class */ (function () {
    function CountryListService(http) {
        var _this = this;
        this.http = http;
        // function 'get's a list of International Countries from the API
        this.getCountryList = function () {
            return _this.http
                .get(environment.apiUrl + "/getProvincesStates")
                // Getting the array of countries from the CountriesList Container
                .pipe(map(function (response) { return response['countriesList']; }));
        };
    }
    CountryListService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CountryListService);
    return CountryListService;
}());
export { CountryListService };
//# sourceMappingURL=country-list.service.js.map