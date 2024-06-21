import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var PaymentService = /** @class */ (function () {
    function PaymentService(http) {
        var _this = this;
        this.http = http;
        this.getApplicationFee = function () {
            return _this.http.get(environment.apiUrl + "/getApplicationFee");
        };
        this.checkPromoCode = function (data) {
            return _this.http.post(environment.apiUrl + "/validatePromoCode", data);
        };
    }
    PaymentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PaymentService);
    return PaymentService;
}());
export { PaymentService };
//# sourceMappingURL=payment.service.js.map