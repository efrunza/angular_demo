import * as tslib_1 from "tslib";
var _a;
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { LoadInfoRelease, LoadInfoReleaseFail, LoadInfoReleaseSuccess, SubmitInfoRelease, SubmitInfoReleaseFail } from '../actions';
import { AppLoadError, AppSubmitError, InfoRelease } from 'shared/models';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState } from 'app/utils/test-utils';
import { mockApplicantInfo, mockFormattedInfoRelease, mockInfoRelease, mockServerError } from '../../utils/test-utils/mockData';
import { configureTestSuite } from 'ng-bullet';
import { InfoReleaseEffects } from 'app/store/effects/infoRelease.effects';
import { InfoReleaseService } from 'shared/services';
var initialTestState = tslib_1.__assign({}, appInitialState, { applicantInfo: {
        ids: [mockApplicantInfo.appId],
        entities: (_a = {},
            _a[mockApplicantInfo.appId] = mockApplicantInfo,
            _a),
        loading: false
    } });
var MockInfoReleaseService = /** @class */ (function () {
    function MockInfoReleaseService() {
        this.loadInfoRelease = jasmine.createSpy('loadInfoRelease');
        this.submitInfoRelease = jasmine.createSpy('submitInfoRelease');
    }
    return MockInfoReleaseService;
}());
describe('Info Release Effects ', function () {
    var effects;
    var actions$;
    var service;
    var store;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                InfoReleaseEffects,
                provideMockActions(function () { return actions$; }),
                { provide: InfoReleaseService, useClass: MockInfoReleaseService },
                provideMockStore({
                    initialState: initialTestState
                })
            ]
        });
    });
    beforeEach(function () {
        effects = TestBed.get(InfoReleaseEffects);
        service = TestBed.get(InfoReleaseService);
        store = TestBed.get(Store);
    });
    describe('GET ', function () {
        it('should get the info release data on success', function () {
            var action = new LoadInfoRelease();
            var id = mockFormattedInfoRelease.id, info = mockFormattedInfoRelease.info;
            var result = new LoadInfoReleaseSuccess(new InfoRelease(id, info));
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: mockInfoRelease });
            var expected = cold('--c', { c: result });
            service.loadInfoRelease.and.returnValue(response);
            expect(effects.getInfoRelease$).toBeObservable(expected);
        });
        it('should create a new academic info with given applicationId when api return empty', function () {
            var action = new LoadInfoRelease();
            var newInfoRelease = new InfoRelease(mockApplicantInfo.appId);
            var result = new LoadInfoReleaseSuccess(newInfoRelease);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.loadInfoRelease.and.returnValue(response);
            expect(effects.getInfoRelease$).toBeObservable(expected);
        });
        it('should create an error on load failure', function () {
            var action = new LoadInfoRelease();
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new LoadInfoReleaseFail(new AppLoadError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.loadInfoRelease.and.returnValue(response);
            expect(effects.getInfoRelease$).toBeObservable(expected);
        });
    });
    describe('POST ', function () {
        it('should create an error on failure', function () {
            var action = new SubmitInfoRelease(mockFormattedInfoRelease);
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new SubmitInfoReleaseFail(new AppSubmitError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.submitInfoRelease.and.returnValue(response);
            expect(effects.submitInfoRelease$).toBeObservable(expected);
        });
    });
    afterEach(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=infoRelease.effects.spec.js.map