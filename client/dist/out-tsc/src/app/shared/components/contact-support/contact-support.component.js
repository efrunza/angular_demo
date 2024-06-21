import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
var ContactSupportInfoComponent = /** @class */ (function () {
    function ContactSupportInfoComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ContactSupportInfoComponent.prototype.openLink = function (event) {
        this.dialogRef.close();
        event.preventDefault();
    };
    ContactSupportInfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact-support-info',
            templateUrl: 'contact-support-info.html'
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef])
    ], ContactSupportInfoComponent);
    return ContactSupportInfoComponent;
}());
export { ContactSupportInfoComponent };
var ContactSupportComponent = /** @class */ (function () {
    function ContactSupportComponent(dialog, mediaObserver) {
        var _this = this;
        this.dialog = dialog;
        this.mediaObserver = mediaObserver;
        this.isMobile = false;
        this.destroyed$ = new Subject();
        mediaObserver
            .asObservable()
            .pipe(tap(function (changes) {
            _this.isMobile = !!changes.find(function (change) { return change.mqAlias === 'lt-md'; });
        }), takeUntil(this.destroyed$))
            .subscribe();
    }
    ContactSupportComponent.prototype.ngOnInit = function () { };
    ContactSupportComponent.prototype.openBottomSheet = function () {
        this.dialog.open(ContactSupportInfoComponent, {
            position: this.isMobile
                ? null
                : {
                    bottom: '2vh',
                    right: '100px'
                }
        });
    };
    ContactSupportComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    ContactSupportComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact-support',
            templateUrl: './contact-support.component.html',
            styleUrls: ['./contact-support.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, MediaObserver])
    ], ContactSupportComponent);
    return ContactSupportComponent;
}());
export { ContactSupportComponent };
//# sourceMappingURL=contact-support.component.js.map