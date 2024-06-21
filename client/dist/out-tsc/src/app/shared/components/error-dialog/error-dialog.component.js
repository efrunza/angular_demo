import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
var ErrorDialogComponent = /** @class */ (function () {
    function ErrorDialogComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.onLogoutClick = function () { return _this.data.action(); };
    }
    ErrorDialogComponent.prototype.ngOnInit = function () { };
    ErrorDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-error-dialog',
            templateUrl: './error-dialog.component.html',
            styleUrls: ['./error-dialog.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ErrorDialogComponent);
    return ErrorDialogComponent;
}());
export { ErrorDialogComponent };
//# sourceMappingURL=error-dialog.component.js.map