import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState, testCoreModules } from 'app/utils/test-utils';
import { DisplayErrorMessage, LoadPrograms } from 'app/store/actions';
import { mockApplicantInfo, mockProgramList, mockProgramListLoadParam, mockServerError } from 'app/utils/test-utils/mockData';
import { configureTestSuite } from 'ng-bullet';
import { CustomTelControlComponent } from 'shared/components/custom-tel-control/custom-tel-control.component';
import { ProgramAvailabilityComponent } from 'app/application/components/program-availability/program-availability.component';
import { AppLoadError } from 'shared/models';
describe('Program Availability Component', function () {
    var _a;
    var component;
    var fixture;
    var store;
    var initialTestState = tslib_1.__assign({}, appInitialState, { programList: {
            ids: ['0'],
            entities: {
                '0': {
                    list: mockProgramList
                }
            },
            saving: false,
            selectedId: '0'
        }, applicantInfo: {
            ids: [mockApplicantInfo.appId],
            entities: (_a = {},
                _a[mockApplicantInfo.appId] = mockApplicantInfo,
                _a),
            saving: false,
            loading: false
        } });
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [ProgramAvailabilityComponent, CustomTelControlComponent],
            imports: testCoreModules.concat([
                MatDatepickerModule,
                MatNativeDateModule,
                MatTableModule,
                MatPaginatorModule
            ]),
            providers: [
                provideMockStore({
                    initialState: initialTestState
                })
            ]
        });
    });
    beforeEach(function () {
        fixture = TestBed.createComponent(ProgramAvailabilityComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should create enough form group', function () {
        fixture.detectChanges();
        expect(component.programAvailabilityForm.get('programStartDate')).toBeTruthy();
    });
    it('should dispatch action to load programs when programStartDate has valid value', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        component.programAvailabilityForm
            .get('programStartDate')
            .setValue(new Date(mockProgramListLoadParam.year, mockProgramListLoadParam.month - 1));
        var action = new LoadPrograms(mockProgramListLoadParam);
        expect(spy).toHaveBeenCalledWith(action);
        expect(component.dataSource.data).toEqual(mockProgramList);
    });
    it('should dispatch an failure load action when programList loading error occurs', function () {
        store.setState(tslib_1.__assign({}, initialTestState, { programList: {
                ids: ['0'],
                entities: {
                    '0': {
                        list: mockProgramList,
                        loading: false,
                        visa: mockApplicantInfo.countryOA,
                        error: new AppLoadError(mockServerError.id, mockServerError.message),
                        id: '0',
                        year: mockProgramListLoadParam.year,
                        month: mockProgramListLoadParam.month
                    }
                },
                selectedId: '0'
            } }));
        var spy = spyOn(store, 'dispatch');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: new AppLoadError(mockServerError.id, mockServerError.message),
            callback: jasmine.any(Function)
        }));
    });
    afterAll(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=program-availability.component.spec.js.map