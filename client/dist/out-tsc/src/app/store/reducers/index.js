import { academicInfoReducers } from './academicInfo.reducer';
import { paymentReducers } from './payment.reducer';
import { personalInfoReducers } from './personalInfo.reducer';
import { languageListReducers } from './languageList.reducer';
import { countryListReducers } from './countryList.reducer';
import { englishProficiencyReducers } from './englishProficiency.reducer';
import { applicantInfoReducers } from './applicantInfo.reducer';
import { programChoiceReducers } from './programChoice.reducer';
import { programListReducers } from './programList.reducer';
import { authReducers } from './auth.reducer';
import { uploadReducer } from './upload.reducer';
import { infoReleaseReducer } from './infoRelease.reducer';
import { agentApplicationReducer } from './agentApplication.reducer';
export var reducers = {
    user: authReducers,
    applicantInfo: applicantInfoReducers,
    personalInfo: personalInfoReducers,
    languageList: languageListReducers,
    countryList: countryListReducers,
    programList: programListReducers,
    englishProficiency: englishProficiencyReducers,
    programChoice: programChoiceReducers,
    academicInfo: academicInfoReducers,
    upload: uploadReducer,
    infoRelease: infoReleaseReducer,
    payment: paymentReducers,
    agentApplications: agentApplicationReducer
};
//# sourceMappingURL=index.js.map