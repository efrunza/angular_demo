import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomTelControlComponent } from '../iaw/shared/components/custom-tel-control/custom-tel-control.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { GravatarModule } from 'ngx-gravatar';
import { ContactSupportComponent, ContactSupportInfoComponent } from '../iaw/shared/components/contact-support/contact-support.component';
import { CommonUtilsService } from '../iaw/services/common-utils.service';
import { ApplicationHttpService, HttpServicePrg, HttpServiceAI } from '../iaw/services/application-http.service';
import { HttpCommonService } from './services/http-common.service';

@NgModule({
  declarations: [
    CustomTelControlComponent,
    MainNavComponent,
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
  providers: [
    ApplicationHttpService,
    HttpServiceAI,
    HttpCommonService,
    CommonUtilsService,

  ],
  entryComponents: [ContactSupportInfoComponent],
  exports: [
    CustomTelControlComponent,
    MainNavComponent,
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
export class SharedModule { }
