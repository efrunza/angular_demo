import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState, testCoreModules } from 'app/utils/test-utils';
import { DisplayErrorMessage, LoadCountryList, LoadInfoRelease, SubmitInfoRelease } from 'app/store/actions';
import { mockApplicantInfo, mockCountry, mockFormattedInfoRelease, mockServerError } from 'app/utils/test-utils/mockData';
import { configureTestSuite } from 'ng-bullet';
import { AppLoadError, AppSubmitError, InfoRelease } from 'shared/models';
import { InfoReleaseComponent } from 'app/application/components/info-release/info-release.component';
import { CustomTelControlComponent } from 'shared/components/custom-tel-control/custom-tel-control.component';
describe('Info Release Component', function () {
    var _a, _b, _c;
    var component;
    var fixture;
    var store;
    var initialTestState = tslib_1.__assign({}, appInitialState, { infoRelease: {
            ids: [mockApplicantInfo.appId],
            entities: (_a = {},
                _a[mockApplicantInfo.appId] = mockFormattedInfoRelease,
                _a),
            saving: false,
            loading: false,
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
            declarations: [InfoReleaseComponent, CustomTelControlComponent],
            imports: testCoreModules.concat([
                MatCheckboxModule,
                MatSelectModule,
                MatRadioModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSlideToggleModule
            ]),
            providers: [
                provideMockStore({
                    initialState: initialTestState
                })
            ]
        });
    });
    beforeEach(function () {
        fixture = TestBed.createComponent(InfoReleaseComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should dispatch an action to load data when created', function () {
        var spy = spyOn(store, 'dispatch');
        var action = new LoadInfoRelease();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(action);
        expect(spy).toHaveBeenCalledWith(new LoadCountryList());
    });
    it('should create enough form group', function () {
        fixture.detectChanges();
        expect(component.authFlag).toBeTruthy();
    });
    it('should call infoReleaseSelectors', function () {
        var infoRelease = mockFormattedInfoRelease;
        fixture.detectChanges();
        expect(component.infoReleaseData).toEqual(infoRelease);
    });
    it('should patch value properly into infoRelease form', function () {
        var infoRelease = {
            authFlag: true,
            info: mockFormattedInfoRelease.info
        };
        fixture.detectChanges();
        expect(component.infoReleaseForm.value).toEqual(infoRelease);
    });
    it('should dispatch an failure load action when englishProf error occurs', function () {
        store.setState(tslib_1.__assign({}, initialTestState, { infoRelease: tslib_1.__assign({}, initialTestState.infoRelease, { error: new AppLoadError(mockServerError.id, mockServerError.message) }) }));
        var spy = spyOn(store, 'dispatch');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: new AppLoadError(mockServerError.id, mockServerError.message),
            callback: jasmine.any(Function)
        }));
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
    it('should remove info FormGroup when authFlag is turned off', function () {
        fixture.detectChanges();
        component.authFlag.setValue(false);
        expect(component.infoFormControl).toBeFalsy();
    });
    it('should add info FormGroup when authFlag is turned off', function () {
        fixture.detectChanges();
        component.authFlag.setValue(true);
        expect(component.infoFormControl).toBeTruthy();
    });
    it('should call dispatch Submit action when submit button is clicked', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new SubmitInfoRelease(new InfoRelease(mockApplicantInfo.appId, mockFormattedInfoRelease.info)));
    });
    it('should dispatch an Error Action when form value is invalid', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        component.infoFormControl.get('title').setValue(null);
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
//# sourceMappingURL=info-release.component.spec.js.map