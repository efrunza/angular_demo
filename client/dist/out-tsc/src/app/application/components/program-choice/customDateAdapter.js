import * as tslib_1 from "tslib";
import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';
var YearMonthDateAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(YearMonthDateAdapter, _super);
    /**
     * to customized date picker to display 'YYYY/MM'
     */
    function YearMonthDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YearMonthDateAdapter.prototype.format = function (date, displayFormat) {
        return date.getFullYear() + " / " + (date.getMonth() + 1);
    };
    YearMonthDateAdapter = tslib_1.__decorate([
        Injectable()
        /**
         * to customized date picker to display 'YYYY/MM'
         */
    ], YearMonthDateAdapter);
    return YearMonthDateAdapter;
}(NativeDateAdapter));
export { YearMonthDateAdapter };
//# sourceMappingURL=customDateAdapter.js.map