import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var UploadService = /** @class */ (function () {
    function UploadService(http) {
        var _this = this;
        this.http = http;
        this.getFiles = function () {
            return _this.http.get(environment.apiUrl + "/getUploadedFiles");
        };
        this.uploadFiles = function (formData) {
            return _this.http.post(environment.apiUrl + "/uploadIwaFiles", formData);
        };
    }
    UploadService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UploadService);
    return UploadService;
}());
export { UploadService };
//# sourceMappingURL=upload.service.js.map