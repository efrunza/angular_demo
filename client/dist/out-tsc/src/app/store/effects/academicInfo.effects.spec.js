import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AcademicInfoEffects } from './academicInfo.effects';
import { Store } from '@ngrx/store';
import { LoadAcademicInfo, LoadAcademicInfoFail, LoadAcademicInfoSuccess, SubmitAcademicInfo, SubmitAcademicInfoFail, SubmitAcademicInfoSuccess } from '../actions';
import { AcademicInfo, AppLoadError, AppSubmitError, ESchoolLevel } from 'shared/models';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState } from 'app/utils/test-utils';
import { mockAcademicInfo, mockApplicantInfo, mockServerError } from '../../utils/test-utils/mockData';
import { AcademicInfoService } from 'shared/services/api/academic-info.service';
import { configureTestSuite } from 'ng-bullet';
var MockAcademicService = /** @class */ (function () {
    function MockAcademicService() {
        this.getAcademicInfo = jasmine.createSpy('getAcademicInfo');
        this.postAcademicInfo = jasmine.createSpy('postAcademicInfo');
    }
    return MockAcademicService;
}());
describe('Academic Info Effects ', function () {
    var effects;
    var actions$;
    var service;
    var store;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                AcademicInfoEffects,
                provideMockActions(function () { return actions$; }),
                { provide: AcademicInfoService, useClass: MockAcademicService },
                provideMockStore({
                    initialState: appInitialState
                })
            ]
        });
    });
    beforeEach(function () {
        effects = TestBed.get(AcademicInfoEffects);
        service = TestBed.get(AcademicInfoService);
        store = TestBed.get(Store);
    });
    describe('GET ', function () {
        it('should get the academic info data on success', function () {
            var action = new LoadAcademicInfo();
            var result = new LoadAcademicInfoSuccess(mockAcademicInfo);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: mockAcademicInfo });
            var expected = cold('--c', { c: result });
            service.getAcademicInfo.and.returnValue(response);
            expect(effects.getAcademicInfo$).toBeObservable(expected);
        });
        it('should create a new academic info with given applicationId when api return empty', function () {
            var _a;
            store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                    ids: [mockApplicantInfo.appId],
                    entities: (_a = {},
                        _a[mockApplicantInfo.appId] = mockApplicantInfo,
                        _a),
                    loading: false
                } }));
            var action = new LoadAcademicInfo();
            var newAcademicInfo = new AcademicInfo(mockApplicantInfo.appId);
            var result = new LoadAcademicInfoSuccess(newAcademicInfo);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.getAcademicInfo.and.returnValue(response);
            expect(effects.getAcademicInfo$).toBeObservable(expected);
        });
        it('should create an error on failure', function () {
            var action = new LoadAcademicInfo();
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new LoadAcademicInfoFail(new AppLoadError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.getAcademicInfo.and.returnValue(response);
            expect(effects.getAcademicInfo$).toBeObservable(expected);
        });
    });
    describe('POST ', function () {
        it('should format data upon success', function () {
            var mockUnformattedAcademicInfo = tslib_1.__assign({}, mockAcademicInfo, { schoolsAttended: mockAcademicInfo.schoolsAttended.concat([
                    {
                        name: 'unformatted',
                        level: ESchoolLevel.MASTER,
                        graduatedFlag: null,
                        uploadDocumentsFlag: null
                    }
                ]) });
            var action = new SubmitAcademicInfo(mockUnformattedAcademicInfo);
            var result = new SubmitAcademicInfoSuccess(mockAcademicInfo);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: {} });
            var expected = cold('--c', { c: result });
            service.postAcademicInfo.and.returnValue(response);
            expect(effects.postAcademicInfo$).toBeObservable(expected);
        });
        it('should create an error on failure', function () {
            var action = new SubmitAcademicInfo(mockAcademicInfo);
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new SubmitAcademicInfoFail(new AppSubmitError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.postAcademicInfo.and.returnValue(response);
            expect(effects.postAcademicInfo$).toBeObservable(expected);
        });
    });
    afterEach(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=academicInfo.effects.spec.js.map