import { NgModule } from '@angular/core';
import { AcademicFormComponent } from './components/academic-form/academic-form.component';
import { EnglishProficiencyComponent } from './components/english-proficiency/english-proficiency.component';
import { InfoReleaseComponent } from './components/info-release/info-release.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProgramAvailabilityComponent } from './components/program-availability/program-availability.component';
import { ProgramChoiceComponent } from './components/program-choice/program-choice.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent, DocUploadInformationModalComponent } from './components/upload/upload.component';
import { DialogComponent } from './components/upload/dialog/dialog.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { FormStepperComponent } from './components/form-stepper/form-stepper.component';
import { ApplicationService } from './services/application.service';
import { HttpServicePI, HttpServiceLng, HttpServiceCtry, HttpServicePrg, HttpServiceAI } from './services/application-http.service';

@NgModule({
  declarations: [
    ApplicationComponent,
    FormStepperComponent,
    PersonalInfoComponent,
    ProgramAvailabilityComponent,
    EnglishProficiencyComponent,
    ProgramChoiceComponent,
    AcademicFormComponent,
    UploadComponent,
    InfoReleaseComponent,
    ReviewSubmitComponent,
    PaymentComponent,
    DialogComponent,
    DocUploadInformationModalComponent
  ],
  imports: [SharedModule, ApplicationRoutingModule],
  exports: [ApplicationComponent, FormStepperComponent],
  entryComponents: [DialogComponent, DocUploadInformationModalComponent],
  providers:
    [
      ApplicationService,
      HttpServicePI,
      HttpServiceLng,
      HttpServiceCtry,
      HttpServicePrg
    ]
})
export class ApplicationModule { }
