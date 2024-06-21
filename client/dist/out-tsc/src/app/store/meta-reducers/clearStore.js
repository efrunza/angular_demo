import * as tslib_1 from "tslib";
import { ESharedActions } from '../actions';
import { academicInfoInitialState, applicantInfoInitialState, englishProficiencyInitialState, infoReleaseInitialState, paymentInitialState, personalInfoInitialState, programChoiceInitialState, uploadInitialState } from '../states';
export function clearStore(reducer) {
    return function (state, action) {
        if (action.type === ESharedActions.CLEAR_STORE) {
            return reducer(tslib_1.__assign({}, state, { user: state.user, applicantInfo: applicantInfoInitialState, personalInfo: personalInfoInitialState, englishProficiency: englishProficiencyInitialState, programChoice: programChoiceInitialState, academicInfo: academicInfoInitialState, upload: uploadInitialState, infoRelease: infoReleaseInitialState, payment: paymentInitialState }), action);
        }
        return reducer(state, action);
    };
}
//# sourceMappingURL=clearStore.js.map