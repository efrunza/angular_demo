import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState, testCoreModules } from 'app/utils/test-utils';
import { DisplayErrorMessage, LoadEnglishProficiency, SubmitEnglishProficiency } from 'app/store/actions';
import { mockApplicantInfo, mockCountry, mockEnglishProf, mockEnglishProfPartnership, mockFormattedEnglishProf, mockServerError } from 'app/utils/test-utils/mockData';
import { EnglishProficiencyComponent } from 'app/application/components/english-proficiency/english-proficiency.component';
import { configureTestSuite } from 'ng-bullet';
import { AppLoadError, AppSubmitError, EEliOption, EnglishProficiency } from 'shared/models';
describe('English Proficiency Component ', function () {
    var _a, _b, _c;
    var component;
    var fixture;
    var store;
    var initialTestState = tslib_1.__assign({}, appInitialState, { englishProficiency: {
            ids: [mockApplicantInfo.appId],
            entities: (_a = {},
                _a[mockApplicantInfo.appId] = tslib_1.__assign({ id: mockApplicantInfo.appId }, mockFormattedEnglishProf),
                _a),
            loading: false,
            saving: false,
            selectedId: mockApplicantInfo.appId
        }, applicantInfo: {
            ids: [mockApplicantInfo.appId],
            entities: (_b = {},
                _b[mockApplicantInfo.appId] = mockApplicantInfo,
                _b),
            saving: false,
            loading: false
        }, countryList: {
            ids: [mockCountry.code],
            entities: (_c = {}, _c[mockCountry.code] = mockCountry, _c),
            loading: false,
            saving: false,
            selectedId: mockCountry.code
        } });
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [EnglishProficiencyComponent],
            imports: testCoreModules.concat([
                MatNativeDateModule,
                MatRadioModule,
                MatOptionModule,
                MatSelectModule,
                MatDatepickerModule
            ]),
            providers: [
                provideMockStore({
                    initialState: initialTestState
                })
            ]
        });
    });
    beforeEach(function () {
        fixture = TestBed.createComponent(EnglishProficiencyComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should dispatch an action to load data when created', function () {
        var spy = spyOn(store, 'dispatch').and.callThrough();
        var action = new LoadEnglishProficiency();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(action);
    });
    it('should create enough form group', function () {
        fixture.detectChanges();
        expect(component.eliOptionDetailFormControl.get('name')).toBeTruthy();
    });
    it('should call academicInfoSelectors', function () {
        var englishProf = {
            eliOption: mockEnglishProf.EliOption,
            eliOptionDetail: {
                name: mockEnglishProf.TestName,
                score: mockEnglishProf.TestScore,
                date: mockEnglishProf.TestDate,
                country: mockEnglishProf.TestCountry
            }
        };
        fixture.detectChanges();
        expect(component.englishProfData).toEqual(englishProf);
    });
    it('should patch value properly into englishProf form', function () {
        var englishProf = {
            eliOption: mockEnglishProf.EliOption,
            eliOptionDetail: {
                name: mockEnglishProf.TestName,
                score: mockEnglishProf.TestScore,
                date: mockEnglishProf.TestDate,
                country: mockEnglishProf.TestCountry
            }
        };
        fixture.detectChanges();
        expect(component.englishProfForm.value).toEqual(englishProf);
    });
    it('should dispatch an failure load action when englishProf error occurs', function () {
        store.setState(tslib_1.__assign({}, initialTestState, { englishProficiency: tslib_1.__assign({}, initialTestState.englishProficiency, { error: new AppLoadError(mockServerError.id, mockServerError.message) }) }));
        var spy = spyOn(store, 'dispatch');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: new AppLoadError(mockServerError.id, mockServerError.message),
            callback: jasmine.any(Function)
        }));
    });
    it('english prof form should patch data patch when eliOption get changed and back', function () {
        fixture.detectChanges();
        component.eliOptionFormControl.setValue(EEliOption.ATTEND_ELI);
        component.eliOptionFormControl.setValue(EEliOption.SUBMIT_SCORE);
        expect(component.eliOptionDetailFormControl.get('name').value).toEqual(mockEnglishProf.TestName);
    });
    it('should dispatch an failure load action when country list error occurs', function () {
        store.setState(tslib_1.__assign({}, initialTestState, { countryList: tslib_1.__assign({}, initialTestState.countryList, { error: new AppLoadError(mockServerError.id, mockServerError.message) }) }));
        var spy = spyOn(store, 'dispatch');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: new AppLoadError(mockServerError.id, mockServerError.message),
            callback: jasmine.any(Function)
        }));
    });
    it('should call dispatch Submit action when submit button is clicked and submit score is chosen', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new SubmitEnglishProficiency(new EnglishProficiency(mockApplicantInfo.appId, component.eliOptionFormControl.value, tslib_1.__assign({}, mockFormattedEnglishProf.test), null, true)));
    });
    it('should call dispatch Submit action when submit button is clicked and submit partnership is chosen', function () {
        var _a;
        store.setState(tslib_1.__assign({}, initialTestState, { englishProficiency: tslib_1.__assign({}, initialTestState.englishProficiency, { entities: (_a = {},
                    _a[mockApplicantInfo.appId] = mockEnglishProfPartnership,
                    _a) }) }));
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new SubmitEnglishProficiency(new EnglishProficiency(mockApplicantInfo.appId, component.eliOptionFormControl.value, null, tslib_1.__assign({}, mockEnglishProfPartnership.partner), true)));
    });
    it('should dispatch an Error Action when form value is invalid', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        component.eliOptionFormControl.setValue(null);
        var error = new AppSubmitError(null, jasmine.any(String));
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: error
        }));
    });
    afterAll(function () {
        store.setState(appInitialState);
    });
});
//# sourceMappingURL=english-proficiency.component.spec.js.map