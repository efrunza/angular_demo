// import { FormStepperComponent } from 'app/application/components/form-stepper/form-stepper.component';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { configureTestSuite } from 'ng-bullet';
// import { MatIconModule, MatStepperModule } from '@angular/material';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ApplicationService } from 'app/application/application.service';
// import { AuthService } from 'app/auth/auth.service';
// import { commonEnv } from '../../../../environments/environment.common';
// import { cold } from 'jasmine-marbles';
//
// class MockApplicationService {}
//
// class MockAuthService {
//   getUserInfo = jasmine.createSpy('getUserInfo');
// }
//
// describe('Form Stepper Component ', () => {
//   let component: FormStepperComponent;
//   let fixture: ComponentFixture<FormStepperComponent>;
//   let applicationService: MockApplicationService;
//   let authService: MockAuthService;
//   configureTestSuite(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormStepperComponent],
//       imports: [
//         MatStepperModule,
//         MatIconModule,
//         RouterTestingModule.withRoutes([])
//       ],
//       providers: [
//         { provide: ApplicationService, useClass: MockApplicationService },
//         { provide: AuthService, useClass: MockAuthService }
//       ]
//     });
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormStepperComponent);
//     component = fixture.componentInstance;
//     authService = TestBed.get(AuthService);
//     applicationService = TestBed.get(ApplicationService);
//   });
//   it('should be created', () => {
//     const response = cold('-b|', {
//       b: {
//         tfp: commonEnv.applicantSignInPolicy
//       }
//     });
//
//     authService.getUserInfo.and.returnValue(response).and.callThrough();
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });
// });
//# sourceMappingURL=form-stepper.component.spec.js.map