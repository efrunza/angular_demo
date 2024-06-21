import { academicInfoInitialState, agentApplicationInitialState, applicantInfoInitialState, countryListInitialState, englishProficiencyInitialState, infoReleaseInitialState, languageListInitialState, paymentInitialState, personalInfoInitialState, programChoiceInitialState, programListContainerInitialState, uploadInitialState } from 'app/store/states';
import { authInitialState } from 'app/store/states/auth.states';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
export var appInitialState = {
    applicantInfo: applicantInfoInitialState,
    user: authInitialState,
    personalInfo: personalInfoInitialState,
    languageList: languageListInitialState,
    countryList: countryListInitialState,
    programList: programListContainerInitialState,
    englishProficiency: englishProficiencyInitialState,
    programChoice: programChoiceInitialState,
    academicInfo: academicInfoInitialState,
    upload: uploadInitialState,
    infoRelease: infoReleaseInitialState,
    payment: paymentInitialState,
    agentApplications: agentApplicationInitialState
};
export var mockMsalConfigs = {
    clientID: 'testClientId'
};
export var testCoreModules = [
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
];
//# sourceMappingURL=index.js.map