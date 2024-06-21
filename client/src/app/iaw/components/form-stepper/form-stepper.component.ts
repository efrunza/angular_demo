import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationService } from '../../../iaw/services/application.service';;
import { ApplicationStatusObject, EUserType, routeList } from '../../../iaw/models';
import { AuthService } from '../../../iaw/services/auth.service';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss']
})
export class FormStepperComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  public destroyed$:any; 
  public selectedStepIndex: number;
  public routeList:any; 
  public steps: { formGroup: FormGroup; formRoute: string; title: string }[]; 
  public userType: EUserType;
  public applicationStatusObject:any;
  public applicationStatus:any;
  private _formComponent;

  @ViewChild('_formComponent') set formComponent(value) {
    this._formComponent = value;
  }

  constructor(public router: Router,private applicationService: ApplicationService,private authService: AuthService,private cdr: ChangeDetectorRef) 
  {
    this.destroyed$ = new Subject();
    this.routeList = routeList;
    this.applicationStatusObject = ApplicationStatusObject;
    this.applicationStatus = ApplicationStatusObject.unknown.text;
    
    this.initializeSteps();

    this.setUserInfo();

    if (this.userType === EUserType.Agent) {
      this.steps[0].title = 'Applicant Information';
    }

    if (applicationService.status) {
      this.applicationStatus = applicationService.status;
    }
  }

  public ngOnInit(): void {
    this.setStepByUrl(true);
  }

  public ngAfterViewInit(): void {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(event => { });
  }

  public ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  public setUserInfo() {
    this.userType = EUserType.Applicant;
  }

  public matchRoute(formRoute, stepIndex, selectedStepIndex): boolean {
    
    const bMatch = this.router.url.match(formRoute) && stepIndex === selectedStepIndex;
    return bMatch;
  }

  public selectionChanged(event: any) {

    this.selectedStepIndex = event.selectedIndex;
    const step = this.steps[event.selectedIndex];
    this.router.navigateByUrl(step.formRoute);
  }

  public isComplete(stepIndex: number): boolean {

    const stepNumber = stepIndex + 1;
    this.setStepByUrl(false);
    return true;
  }

  public setStepByUrl(onInit = false): void 
  {

    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    const targetStepIndex = this.steps.findIndex(step => {
      return !!step.formRoute.match(urlWithoutParams);
    });

    if (onInit) 
    {
      if (targetStepIndex >= 0) this.selectedStepIndex = targetStepIndex;
    } 
    else 
    {
      this.selectedStepIndex = targetStepIndex;
    }
  }

  public ngOnDestroy() 
  {    
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  private initializeSteps()
  {
    this.steps =
    [
      {
        formGroup: this.formComponent? this.formComponent.personalInfoForm: null,
        formRoute: '/application/personal-info',
        title: 'Personal Information'
      },
      {
        formGroup: this.formComponent? this.formComponent.programAvailabilityForm: null,
        formRoute: '/application/program-availability',
        title: 'Program Availability'
      },
      {
        formGroup: this.formComponent ? this.formComponent.eliOptionsForm : null,
        formRoute: '/application/english-proficiency',
        title: 'English Proficiency'
      },
      {
        formGroup: this.formComponent? this.formComponent.programChoiceForm: null,
        formRoute: '/application/program-choice',
        title: 'Program Choice'
      },
      {
        formGroup: this.formComponent ? this.formComponent.academicForm : null,
        formRoute: '/application/academic-info',
        title: 'Academic Information'
      },
      {
        formGroup: this.formComponent ? this.formComponent.fileuploadForm : null,
        formRoute: '/application/file-up',
        title: 'Document Upload'
      },
      {
        formGroup: this.formComponent ? this.formComponent.infoReleaseForm : null,
        formRoute: '/application/info-release',
        title: 'Information Release'
      },
      {
        formGroup: this.formComponent? this.formComponent.reviewSubmitForm: null,
        formRoute: '/application/review-submit',
        title: 'Review Application'
      },
      {
        formGroup: this.formComponent ? this.formComponent.paymentForm : null,
        formRoute: '/application/payment',
        title: 'Payment & Submission'
      }
    ];
  }
}
