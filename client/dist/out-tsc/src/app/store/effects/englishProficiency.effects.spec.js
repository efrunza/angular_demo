import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { AppLoadError, EnglishProficiency } from 'shared/models';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState } from 'app/utils/test-utils';
import { mockApplicantInfo, mockEnglishProf, mockFormattedEnglishProf, mockServerError } from '../../utils/test-utils/mockData';
import { EnglishProficiencyEffects } from 'app/store/effects/englishProficiency.effects';
import { EnglishProficiencyService } from 'shared/services';
import { LoadEnglishProficiency, LoadEnglishProficiencyFail, LoadEnglishProficiencySuccess } from 'app/store/actions';
import { configureTestSuite } from 'ng-bullet';
var MockEnglishProficiencyService = /** @class */ (function () {
    function MockEnglishProficiencyService() {
        this.getEnglishProficiency = jasmine.createSpy('getEnglishProficiency');
        this.postEnglishProficiency = jasmine.createSpy('postEnglishProficiency');
    }
    return MockEnglishProficiencyService;
}());
describe('English Proficiency Effects ', function () {
    var effects;
    var actions$;
    var service;
    var store;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                EnglishProficiencyEffects,
                provideMockActions(function () { return actions$; }),
                {
                    provide: EnglishProficiencyService,
                    useClass: MockEnglishProficiencyService
                },
                provideMockStore({
                    initialState: appInitialState
                })
            ]
        });
    });
    beforeEach(function () {
        effects = TestBed.get(EnglishProficiencyEffects);
        service = TestBed.get(EnglishProficiencyService);
        store = TestBed.get(Store);
    });
    describe('GET ', function () {
        it('should get english prof data on success', function () {
            var _a;
            store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                    ids: [mockApplicantInfo.appId],
                    entities: (_a = {},
                        _a[mockApplicantInfo.appId] = mockApplicantInfo,
                        _a),
                    loading: false
                } }));
            var action = new LoadEnglishProficiency();
            var id = mockFormattedEnglishProf.id, eliOption = mockFormattedEnglishProf.eliOption, partner = mockFormattedEnglishProf.partner, uploadDocument = mockFormattedEnglishProf.uploadDocument, test = mockFormattedEnglishProf.test;
            var result = new LoadEnglishProficiencySuccess(new EnglishProficiency(id, eliOption, test, partner, uploadDocument));
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: mockEnglishProf });
            var expected = cold('--c', { c: result });
            service.getEnglishProficiency.and.returnValue(response);
            expect(effects.loadEnglishProficiency$).toBeObservable(expected);
        });
        it('should create a new english proficiency with given applicationId when api return empty', function () {
            var _a;
            store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                    ids: [mockApplicantInfo.appId],
                    entities: (_a = {},
                        _a[mockApplicantInfo.appId] = mockApplicantInfo,
                        _a),
                    loading: false
                } }));
            var action = new LoadEnglishProficiency();
            var newEnglishProf = new EnglishProficiency(mockApplicantInfo.appId);
            var result = new LoadEnglishProficiencySuccess(newEnglishProf);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.getEnglishProficiency.and.returnValue(response);
            expect(effects.loadEnglishProficiency$).toBeObservable(expected);
        });
        it('should create an error on failure', function () {
            var action = new LoadEnglishProficiency();
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new LoadEnglishProficiencyFail(new AppLoadError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.getEnglishProficiency.and.returnValue(response);
            expect(effects.loadEnglishProficiency$).toBeObservable(expected);
        });
    });
    afterEach(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=englishProficiency.effects.spec.js.map