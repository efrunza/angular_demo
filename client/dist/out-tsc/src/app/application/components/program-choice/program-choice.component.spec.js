import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { MatDatepickerModule, MatDialogModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState, testCoreModules } from 'app/utils/test-utils';
import { DisplayErrorMessage, LoadProgramChoices } from 'app/store/actions';
import { mockApplicantInfo, mockFormattedProgramChoices, mockProgramChoices, mockServerError } from 'app/utils/test-utils/mockData';
import { configureTestSuite } from 'ng-bullet';
import { ProgramChoiceComponent } from 'app/application/components/program-choice/program-choice.component';
import { InputChoiceComponent } from 'app/application/components/program-choice/components/input-choice/input-choice.component';
import { ProgramDialogComponent } from 'app/application/components/program-choice/components/program-dialog/program-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppLoadError, AppSubmitError } from 'shared/models';
describe('Program Choice Form Component ', function () {
    var _a, _b;
    var component;
    var fixture;
    var store;
    var initialTestState = tslib_1.__assign({}, appInitialState, { programChoice: {
            ids: [mockProgramChoices.applicationId],
            entities: (_a = {},
                _a[mockProgramChoices.applicationId] = mockFormattedProgramChoices,
                _a),
            saving: false,
            loading: false,
            selectedId: mockProgramChoices.applicationId
        }, applicantInfo: {
            ids: [mockApplicantInfo.appId],
            entities: (_b = {},
                _b[mockApplicantInfo.appId] = mockApplicantInfo,
                _b),
            saving: false,
            loading: false
        } });
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ProgramChoiceComponent,
                InputChoiceComponent,
                ProgramDialogComponent
            ],
            imports: testCoreModules.concat([
                MatDatepickerModule,
                MatTableModule,
                MatPaginatorModule,
                MatDialogModule,
                MatProgressSpinnerModule,
                MatSnackBarModule,
                MatNativeDateModule,
                RouterTestingModule.withRoutes([])
            ]),
            providers: [
                provideMockStore({
                    initialState: initialTestState
                })
            ]
        });
    });
    beforeEach(function () {
        fixture = TestBed.createComponent(ProgramChoiceComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should dispatch an action to load data when created', function () {
        var spy = spyOn(store, 'dispatch');
        var action = new LoadProgramChoices();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(action);
    });
    it('should create enough form group', function () {
        fixture.detectChanges();
        expect(component.choices.length).toEqual(mockProgramChoices.choices.length);
    });
    it('should set first choice to be required', function () {
        fixture.detectChanges();
        expect(component.choices
            .at(0)
            .get('program')
            .setValue(null));
        expect(component.programChoiceForm.valid).toBeFalsy();
    });
    it('should patch value properly into formGroup', function () {
        fixture.detectChanges();
        expect(component.programChoiceForm.value.choices).toEqual(mockFormattedProgramChoices.choices);
    });
    it('should create an empty choice when store is empty', function () {
        var _a;
        store.setState(tslib_1.__assign({}, appInitialState, { applicantInfo: {
                ids: [mockApplicantInfo.appId],
                entities: (_a = {},
                    _a[mockApplicantInfo.appId] = mockApplicantInfo,
                    _a),
                loading: false
            } }));
        fixture.detectChanges();
        expect(component.choices.value[0]).toEqual({
            startDate: null,
            program: null,
            campus: null,
            acadPlan: null,
            acadCareer: null,
            description: null
        });
    });
    // it('should call dispatch Submit action when submit button is clicked', () => {
    //   fixture.detectChanges();
    //   const spy = spyOn(store, 'dispatch');
    //
    //   const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
    //     'button[type=submit]'
    //   );
    //   submitButton.click();
    //   expect(spy).toHaveBeenCalledWith(
    //     new SubmitProgramChoices(mockProgramChoices.choices)
    //   );
    // });
    it('should dispatch an Error Action when form value is invalid', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        component.choices
            .at(0)
            .get('campus')
            .setValue(null);
        var error = new AppSubmitError(null, jasmine.any(String));
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: error
        }));
    });
    it('should dispatch an failure load action when error occurs', function () {
        store.setState(tslib_1.__assign({}, initialTestState, { programChoice: tslib_1.__assign({}, initialTestState.programChoice, { error: new AppLoadError(mockServerError.id, mockServerError.message), saving: false }) }));
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
//# sourceMappingURL=program-choice.component.spec.js.map