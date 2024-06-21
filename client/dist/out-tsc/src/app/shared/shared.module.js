import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/shared/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomTelControlComponent } from 'app/shared/components/custom-tel-control/custom-tel-control.component';
import { MainNavComponent } from 'app/shared/components/main-nav/main-nav.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { ErrorDialogComponent } from 'shared/components/error-dialog/error-dialog.component';
import { GravatarModule } from 'ngx-gravatar';
import { ContactSupportComponent, ContactSupportInfoComponent } from './components/contact-support/contact-support.component';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                CustomTelControlComponent,
                MainNavComponent,
                ErrorDialogComponent,
                ContactSupportComponent,
                ContactSupportInfoComponent
            ],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule,
                LayoutModule,
                FormsModule,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                HttpClientModule,
                ScrollingModule,
                GravatarModule
            ],
            entryComponents: [ErrorDialogComponent, ContactSupportInfoComponent],
            exports: [
                // exporting shared components
                CustomTelControlComponent,
                MainNavComponent,
                ErrorDialogComponent,
                // exporting shared modules
                CommonModule,
                MaterialModule,
                LayoutModule,
                FormsModule,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                HttpClientModule,
                ScrollingModule,
                GravatarModule,
                ContactSupportComponent,
                ContactSupportInfoComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map