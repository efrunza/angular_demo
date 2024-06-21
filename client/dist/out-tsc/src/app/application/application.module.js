import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AcademicFormComponent } from 'app/application/components/academic-form/academic-form.component';
import { PostSecondaryEduComponent } from 'app/application/components/academic-form/components/post-secondary-edu/post-secondary-edu.component';
import { EnglishProficiencyComponent } from 'app/application/components/english-proficiency/english-proficiency.component';
import { InfoReleaseComponent } from 'app/application/components/info-release/info-release.component';
import { PaymentComponent } from 'app/application/components/payment/payment.component';
import { PersonalInfoComponent } from 'app/application/components/personal-info/personal-info.component';
import { ProgramAvailabilityComponent } from 'app/application/components/program-availability/program-availability.component';
import { ProgramChoiceComponent } from 'app/application/components/program-choice/program-choice.component';
import { ReviewSubmitComponent } from 'app/application/components/review-submit/review-submit.component';
import { SharedModule } from 'shared/shared.module';
import { InputChoiceComponent } from './components/program-choice/components/input-choice/input-choice.component';
import { ProgramDialogComponent } from './components/program-choice/components/program-dialog/program-dialog.component';
import { UploadComponent, DocUploadInformationModalComponent } from './components/upload/upload.component';
import { DialogComponent } from './components/upload/dialog/dialog.component';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { FormStepperComponent } from './components/form-stepper/form-stepper.component';
var ApplicationModule = /** @class */ (function () {
    function ApplicationModule() {
    }
    ApplicationModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                ApplicationComponent,
                FormStepperComponent,
                // main components
                PersonalInfoComponent,
                ProgramAvailabilityComponent,
                EnglishProficiencyComponent,
                ProgramChoiceComponent,
                AcademicFormComponent,
                UploadComponent,
                InfoReleaseComponent,
                ReviewSubmitComponent,
                PaymentComponent,
                // nested components
                PostSecondaryEduComponent,
                InputChoiceComponent,
                ProgramDialogComponent,
                DialogComponent,
                DocUploadInformationModalComponent
            ],
            imports: [SharedModule, ApplicationRoutingModule],
            exports: [ApplicationComponent, FormStepperComponent],
            entryComponents: [
                ProgramDialogComponent,
                DialogComponent,
                DocUploadInformationModalComponent
            ]
        })
    ], ApplicationModule);
    return ApplicationModule;
}());
export { ApplicationModule };
//# sourceMappingURL=application.module.js.map