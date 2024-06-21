import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { LoadProgramChoices, LoadProgramChoicesFail, LoadProgramChoicesSuccess, SubmitProgramChoices, SubmitProgramChoicesFail } from '../actions';
import { ProgramChoiceService } from 'shared/services/api/program-choice.service';
import { AppLoadError, AppSubmitError, ENGLISH_LANGUAGE_INSTITUTE, ProgramChoiceApp } from 'shared/models';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState } from 'app/utils/test-utils';
import { mockApplicantInfo, mockProgramChoices, mockServerError } from '../../utils/test-utils/mockData';
import { ProgramChoiceEffects } from './index';
import { campusNameConverter } from 'app/utils';
import { configureTestSuite } from 'ng-bullet';
var MockProgramChoiceService = /** @class */ (function () {
    function MockProgramChoiceService() {
        this.getProgramChoices = jasmine.createSpy('getProgramChoices');
        this.postProgramChoices = jasmine.createSpy('postProgramChoices');
    }
    return MockProgramChoiceService;
}());
describe('Program Choice Effects ', function () {
    var effects;
    var actions$;
    var service;
    var store;
    configureTestSuite(function () {
        var _a;
        TestBed.configureTestingModule({
            providers: [
                ProgramChoiceEffects,
                provideMockActions(function () { return actions$; }),
                { provide: ProgramChoiceService, useClass: MockProgramChoiceService },
                provideMockStore({
                    initialState: tslib_1.__assign({}, appInitialState, { applicantInfo: {
                            ids: [mockApplicantInfo.appId],
                            entities: (_a = {},
                                _a[mockApplicantInfo.appId] = mockApplicantInfo,
                                _a),
                            loading: false
                        } })
                })
            ]
        });
    });
    beforeEach(function () {
        effects = TestBed.get(ProgramChoiceEffects);
        service = TestBed.get(ProgramChoiceService);
        store = TestBed.get(Store);
    });
    describe('GET ', function () {
        it('should get the program choice data on success', function () {
            var action = new LoadProgramChoices();
            var result = new LoadProgramChoicesSuccess(mockProgramChoices);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: mockProgramChoices });
            var expected = cold('--c', { c: result });
            service.getProgramChoices.and.returnValue(response);
            expect(effects.getProgramChoices$).toBeObservable(expected);
        });
        it('should create a new program choice with no choice with given applicationId when api return empty and EliOption is not 2', function () {
            var _a;
            store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                    ids: [mockApplicantInfo.appId],
                    entities: (_a = {},
                        _a[mockApplicantInfo.appId] = tslib_1.__assign({}, mockApplicantInfo, { EliOption: '1' }),
                        _a),
                    loading: false
                } }));
            var action = new LoadProgramChoices();
            var newProgramChoice = new ProgramChoiceApp(mockApplicantInfo.appId);
            var result = new LoadProgramChoicesSuccess(newProgramChoice);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.getProgramChoices.and.returnValue(response);
            expect(effects.getProgramChoices$).toBeObservable(expected);
        });
        it('should create a new program choice with ELI as the first option with given applicationId when api return empty and EliOption is 2', function () {
            var _a;
            store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                    ids: [mockApplicantInfo.appId],
                    entities: (_a = {},
                        _a[mockApplicantInfo.appId] = tslib_1.__assign({}, mockApplicantInfo, { EliOption: '2' }),
                        _a),
                    loading: false
                } }));
            var action = new LoadProgramChoices();
            var newProgramChoice = new ProgramChoiceApp(mockApplicantInfo.appId, [
                {
                    startDate: null,
                    program: ENGLISH_LANGUAGE_INSTITUTE.programCode,
                    description: ENGLISH_LANGUAGE_INSTITUTE.programDesc,
                    campus: campusNameConverter(ENGLISH_LANGUAGE_INSTITUTE.campus),
                    acadPlan: ENGLISH_LANGUAGE_INSTITUTE.acadPlan,
                    acadCareer: ENGLISH_LANGUAGE_INSTITUTE.acadCareer
                }
            ]);
            var result = new LoadProgramChoicesSuccess(newProgramChoice);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.getProgramChoices.and.returnValue(response);
            expect(effects.getProgramChoices$).toBeObservable(expected);
        });
        it('should create an error on failure', function () {
            var action = new LoadProgramChoices();
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new LoadProgramChoicesFail(new AppLoadError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.getProgramChoices.and.returnValue(response);
            expect(effects.getProgramChoices$).toBeObservable(expected);
        });
    });
    describe('POST ', function () {
        it('should create an error on failure', function () {
            var action = new SubmitProgramChoices(mockProgramChoices.choices);
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new SubmitProgramChoicesFail(new AppSubmitError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.postProgramChoices.and.returnValue(response);
            expect(effects.postProgramChoices$).toBeObservable(expected);
        });
    });
    afterAll(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=programChoice.effects.spec.js.map