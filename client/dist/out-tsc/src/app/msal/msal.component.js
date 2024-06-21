import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
// This component is used only to avoid Angular reload
// when doing acquireTokenSilent()
var MsalComponent = /** @class */ (function () {
    function MsalComponent(Msal) {
        this.Msal = Msal;
    }
    MsalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            template: ''
        }),
        tslib_1.__metadata("design:paramtypes", [MsalService])
    ], MsalComponent);
    return MsalComponent;
}());
export { MsalComponent };
//# sourceMappingURL=msal.component.js.map