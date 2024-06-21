import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { AcademicFormComponent } from './components/academic-form/academic-form.component';
import { EnglishProficiencyComponent } from './components/english-proficiency/english-proficiency.component';
import { InfoReleaseComponent } from './components/info-release/info-release.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProgramAvailabilityComponent } from './components/program-availability/program-availability.component';
import { ProgramChoiceComponent } from './components/program-choice/program-choice.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { UploadComponent } from './components/upload/upload.component';
import { ApplicationGuard } from './application.guard';
import { routeList } from 'app/shared/models';
var applicationRoutes = [
    {
        path: '',
        component: ApplicationComponent,
        canActivate: [ApplicationGuard],
        children: [
            {
                path: "" + routeList.application.children.personalInfo,
                component: PersonalInfoComponent
            },
            {
                path: "" + routeList.application.children.programList,
                component: ProgramAvailabilityComponent
            },
            {
                path: "" + routeList.application.children.englishProf,
                component: EnglishProficiencyComponent
            },
            {
                path: "" + routeList.application.children.programChoice,
                component: ProgramChoiceComponent
            },
            {
                path: "" + routeList.application.children.academicInfo,
                component: AcademicFormComponent
            },
            {
                path: "" + routeList.application.children.documentUpload,
                component: UploadComponent
            },
            {
                path: "" + routeList.application.children.infoRelease,
                component: InfoReleaseComponent
            },
            {
                path: "" + routeList.application.children.review,
                component: ReviewSubmitComponent
            },
            {
                path: "" + routeList.application.children.payment,
                component: PaymentComponent
            }
        ]
    }
];
var ApplicationRoutingModule = /** @class */ (function () {
    function ApplicationRoutingModule() {
    }
    ApplicationRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(applicationRoutes)],
            exports: [RouterModule]
        })
    ], ApplicationRoutingModule);
    return ApplicationRoutingModule;
}());
export { ApplicationRoutingModule };
//# sourceMappingURL=application-routing.module.js.map