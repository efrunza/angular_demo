import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { LoadAgentApplications, LoadAgentApplicationsFail, LoadAgentApplicationsSuccess } from '../actions';
import { AppLoadError } from 'shared/models';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState } from 'app/utils/test-utils';
import { mockAgentApplications, mockServerError } from '../../utils/test-utils/mockData';
import { configureTestSuite } from 'ng-bullet';
import { AgentApplicationEffects } from 'app/store/effects/agentApplication.effects';
import { AgentApplicationService } from 'shared/services';
var MockAgentApplicationService = /** @class */ (function () {
    function MockAgentApplicationService() {
        this.loadAgentApplications = jasmine.createSpy('loadAgentApplications');
    }
    return MockAgentApplicationService;
}());
describe('Agent Application Effects ', function () {
    var effects;
    var actions$;
    var service;
    var store;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                AgentApplicationEffects,
                provideMockActions(function () { return actions$; }),
                {
                    provide: AgentApplicationService,
                    useClass: MockAgentApplicationService
                },
                provideMockStore({
                    initialState: appInitialState
                })
            ]
        });
    });
    beforeEach(function () {
        effects = TestBed.get(AgentApplicationEffects);
        service = TestBed.get(AgentApplicationService);
        store = TestBed.get(Store);
    });
    describe('GET ', function () {
        it('should load list of agent applications', function () {
            var action = new LoadAgentApplications();
            var result = new LoadAgentApplicationsSuccess(mockAgentApplications);
            actions$ = hot('-a', { a: action });
            var response = cold('-b|', { b: mockAgentApplications });
            var expected = cold('--c', { c: result });
            service.loadAgentApplications.and.returnValue(response);
            expect(effects.getAgentApplications$).toBeObservable(expected);
        });
        it('should create an error on failure', function () {
            var action = new LoadAgentApplications();
            actions$ = hot('-a', { a: action });
            var httpError = new HttpErrorResponse({ error: mockServerError });
            var result = new LoadAgentApplicationsFail(new AppLoadError(httpError.error.id, httpError.error.message));
            var response = cold('-#', {}, httpError);
            var expected = cold('--c', { c: result });
            service.loadAgentApplications.and.returnValue(response);
            expect(effects.getAgentApplications$).toBeObservable(expected);
        });
    });
    afterEach(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=agentApplication.effects.spec.js.map