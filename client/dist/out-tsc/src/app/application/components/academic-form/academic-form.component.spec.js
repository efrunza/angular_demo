import * as tslib_1 from "tslib";
import { TestBed } from '@angular/core/testing';
import { AcademicFormComponent } from './academic-form.component';
import { MatOptionModule, MatSelectModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { appInitialState, testCoreModules } from 'app/utils/test-utils';
import { DisplayErrorMessage, LoadAcademicInfo, SubmitAcademicInfo } from 'app/store/actions';
import { PostSecondaryEduComponent } from './components/post-secondary-edu/post-secondary-edu.component';
import { AcademicInfo, AppLoadError, AppSubmitError, ESchoolLevel } from 'shared/models';
import { mockAcademicInfo, mockApplicantInfo, mockFormattedAcademicInfoData, mockServerError } from 'app/utils/test-utils/mockData';
import { configureTestSuite } from 'ng-bullet';
describe('Academic Form Component ', function () {
    var _a, _b;
    var component;
    var fixture;
    var store;
    var initialTestState = tslib_1.__assign({}, appInitialState, { academicInfo: {
            ids: [mockAcademicInfo.id],
            entities: (_a = {},
                _a[mockAcademicInfo.id] = mockAcademicInfo,
                _a),
            loading: false,
            saving: false,
            selectedId: mockAcademicInfo.id
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
            declarations: [AcademicFormComponent, PostSecondaryEduComponent],
            imports: testCoreModules.concat([MatSelectModule, MatOptionModule]),
            providers: [
                provideMockStore({
                    initialState: initialTestState
                })
            ]
        });
    });
    beforeEach(function () {
        fixture = TestBed.createComponent(AcademicFormComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should dispatch an action to load data when created', function () {
        var spy = spyOn(store, 'dispatch');
        var action = new LoadAcademicInfo();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(action);
    });
    it('should create enough form group', function () {
        fixture.detectChanges();
        expect(component.academicForm.get('highSchool')).toBeTruthy();
        expect(component.postSecondaryEdus.length).toEqual(mockAcademicInfo.schoolsAttended.filter(function (school) { return school.level !== ESchoolLevel.HIGH_SCHOOL; }).length);
    });
    it('should patch value properly into formGroup', function () {
        var mockAcademicFormValue = Object.keys(mockFormattedAcademicInfoData).reduce(function (object, key) {
            if (key !== 'id') {
                object[key] = mockFormattedAcademicInfoData[key];
            }
            return object;
        }, {});
        fixture.detectChanges();
        expect(component.academicForm.value).toEqual(mockAcademicFormValue);
    });
    it('should add another post secondary edu form group when add button is clicked', function () {
        fixture.detectChanges();
        var addButton = fixture.debugElement.nativeElement.querySelector('#add-post-secondary');
        var previousFormGroupNumber = component.postSecondaryEdus.length;
        addButton.click();
        expect(component.postSecondaryEdus.length).toEqual(previousFormGroupNumber + 1);
    });
    it('should remove a secondary edu form group when remove button is clicked', function () {
        fixture.detectChanges();
        var previousFormGroupNumber = component.postSecondaryEdus.length;
        var removeButton = fixture.debugElement.nativeElement.querySelector('#delete-post-secondary');
        removeButton.click();
        expect(component.postSecondaryEdus.length).toEqual(previousFormGroupNumber - 1);
    });
    it('should call dispatch Submit action when submit button is clicked', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new SubmitAcademicInfo(new AcademicInfo(mockAcademicInfo.id, mockAcademicInfo.schoolsAttended)));
    });
    it('should dispatch an Error Action when form value is invalid', function () {
        fixture.detectChanges();
        var spy = spyOn(store, 'dispatch');
        component.academicForm.get('highSchool.name').setValue(null);
        var error = new AppSubmitError(null, jasmine.any(String));
        var submitButton = fixture.debugElement.nativeElement.querySelector('button[type=submit]');
        submitButton.click();
        expect(spy).toHaveBeenCalledWith(new DisplayErrorMessage({
            error: error
        }));
    });
    it('should dispatch an failure load action when error occurs', function () {
        var _a;
        store.setState(tslib_1.__assign({}, appInitialState, { academicInfo: {
                ids: [mockAcademicInfo.id],
                entities: (_a = {},
                    _a[mockAcademicInfo.id] = mockAcademicInfo,
                    _a),
                loading: false,
                saving: false,
                selectedId: mockAcademicInfo.id,
                error: new AppLoadError(mockServerError.id, mockServerError.message)
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
//# sourceMappingURL=academic-form.component.spec.js.map