import * as tslib_1 from "tslib";
import { PersonalInfoEffects } from './personalInfo.effects';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { appInitialState } from 'app/utils/test-utils';
import { PersonalInfoService } from 'shared/services';
import { LoadApplicantInfo, LoadPersonalInfo, LoadPersonalInfoFail, LoadPersonalInfoSuccess, SubmitPersonalInfo, SubmitPersonalInfoFail, SubmitPersonalInfoSuccess } from 'app/store/actions';
import { mockApplicantInfo, mockPersonalInfo, mockServerError } from 'app/utils/test-utils/mockData';
import { cold, hot } from 'jasmine-marbles';
import { AuthService } from 'app/auth/auth.service';
import { AppLoadError, AppSubmitError, PersonalInfo } from 'shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { commonEnv } from '../../../environments/environment.common';
var MockPersonalInfoService = /** @class */ (function () {
    function MockPersonalInfoService() {
        this.getPersonalInfo = jasmine.createSpy('getPersonalInfo');
        this.postPersonalInfo = jasmine.createSpy('postPersonalInfo');
    }
    return MockPersonalInfoService;
}());
var MockAuthService = /** @class */ (function () {
    function MockAuthService() {
        this.getUserInfo = jasmine.createSpy('getUserInfo');
    }
    return MockAuthService;
}());
describe('Personal Info Effect ', function () {
    var effects;
    var actions$;
    var service;
    var store;
    var authService;
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                PersonalInfoEffects,
                provideMockActions(function () { return actions$; }),
                { provide: PersonalInfoService, useClass: MockPersonalInfoService },
                { provide: AuthService, useClass: MockAuthService },
                provideMockStore({
                    initialState: appInitialState
                })
            ]
        });
        effects = TestBed.get(PersonalInfoEffects);
        service = TestBed.get(PersonalInfoService);
        authService = TestBed.get(AuthService);
        store = TestBed.get(Store);
        var spy;
        spy = spyOn(store, 'dispatch').and.callThrough();
    });
    describe('GET ', function () {
        it('should get the personal info data on success', function () {
            var action = new LoadPersonalInfo();
            var result = new LoadPersonalInfoSuccess(mockPersonalInfo);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: mockPersonalInfo });
            var expected = cold('--c', { c: result });
            service.getPersonalInfo.and.returnValue(response);
            expect(effects.getPersonalInfo$).toBeObservable(expected);
        });
        it('should create a new personal info with given applicationId when api return empty', function () {
            var _a;
            store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                    ids: [mockApplicantInfo.appId],
                    entities: (_a = {},
                        _a[mockApplicantInfo.appId] = mockApplicantInfo,
                        _a),
                    loading: false
                } }));
            var action = new LoadPersonalInfo();
            var newPersonalInfo = new PersonalInfo();
            newPersonalInfo.appId = mockApplicantInfo.appId;
            var result = new LoadPersonalInfoSuccess(newPersonalInfo);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.getPersonalInfo.and.returnValue(response);
            expect(effects.getPersonalInfo$).toBeObservable(expected);
        });
        it('should create an error on failure', function () {
            var action = new LoadPersonalInfo();
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new LoadPersonalInfoFail(new AppLoadError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.getPersonalInfo.and.returnValue(response);
            expect(effects.getPersonalInfo$).toBeObservable(expected);
        });
    });
    describe('POST ', function () {
        it('should dispatch LoadApplicantInfo to get appId after success', function () {
            var action = new SubmitPersonalInfo(mockPersonalInfo);
            var result = new SubmitPersonalInfoSuccess(mockPersonalInfo);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.postPersonalInfo.and.returnValue(response);
            authService.getUserInfo.and.returnValue({
                tfp: commonEnv.applicantSignInPolicy
            });
            expect(effects.postPersonalInfo$).toBeObservable(expected);
            expect(store.dispatch).toHaveBeenCalledWith(new LoadApplicantInfo());
        });
        it('should create an error on failure', function () {
            var action = new SubmitPersonalInfo(mockPersonalInfo);
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new SubmitPersonalInfoFail(new AppSubmitError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            authService.getUserInfo.and.returnValue({
                tfp: commonEnv.applicantSignInPolicy
            });
            service.postPersonalInfo.and.returnValue(response);
            expect(effects.postPersonalInfo$).toBeObservable(expected);
        });
    });
    afterEach(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=personalInfo.effects.spec.js.map