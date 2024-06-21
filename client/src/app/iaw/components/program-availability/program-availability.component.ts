import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDatepicker, MatPaginator, MatTableDataSource } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { YearMonthDateAdapter } from '../program-choice/customDateAdapter';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { HttpServiceAI, HttpServicePrg } from '../../../iaw/services/application-http.service';
import { CommonUtilsService } from '../../../iaw/services/common-utils.service';
import { IProgram, IProgramListReqParamPayload, IApplicantInfo, IProgramListReqParams } from '../../../iaw/models';
import { ApplicationService } from '../../../iaw/services/application.service';

const YEAR_MONTH_DATE_FORMAT = 
{
  parse: 
  { 
    dateInput: 'YYYY-MM-dd' 
  },
  display: 
  {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-program-availability',
  templateUrl: './program-availability.component.html',
  styleUrls: ['./program-availability.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: YearMonthDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MONTH_DATE_FORMAT }
  ]
})
export class ProgramAvailabilityComponent implements OnInit, OnDestroy {

  public programAvailabilityForm: FormGroup;
  public initialDate: Date;
  public validProgramMonths: number[];
  public maxDate: Date;
  public minDate: Date;
  public normalAppliedMonths: number[];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<IProgram>;
  public programListData: any;
  public selectedStartDate: Date;
  public reqParamPayload: IProgramListReqParamPayload;
  public appInfo: IApplicantInfo;
  public isLoading: boolean;
  public isLoadingError: boolean;
  public isMobile: boolean;
  public destroyed$ = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor
  (
    private formBuilder: FormBuilder,
    private mediaObserver: MediaObserver,
    private cdr: ChangeDetectorRef,
    private applicationService: ApplicationService,
    private httpServiceAI: HttpServiceAI,
    private httpServicePrg: HttpServicePrg,
    private commonUtilsService: CommonUtilsService
  ) 
  {
    const date = new Date();

    this.initialDate = new Date();
    this.validProgramMonths = [0, 4, 8];
    this.normalAppliedMonths = [0, 4, 8];
    this.displayedColumns = ['programCode', 'programName', 'campus'];

    this.maxDate = new Date(this.initialDate.getFullYear() + 2, 11);
    this.minDate = new Date(this.initialDate.getFullYear(), this.initialDate.getMonth() + 1, 1);

    const nextTermMonth = this.normalAppliedMonths.find(month => month > date.getMonth());

    let year = nextTermMonth ? date.getFullYear() : date.getFullYear() + 1;
    let month = nextTermMonth ? nextTermMonth : this.normalAppliedMonths[0];

    this.isLoading = true;
    this.isLoadingError = false;
    this.destroyed$ = new Subject();
    this.isMobile = false;

    this.programListData = { loading: false, list: [] };

    this.minDate = new Date(2019, 8, 1);

    // determined whether the user is in mobile or not
    mediaObserver
      .asObservable()
      .pipe(
        tap((changes: MediaChange[]) => {
          this.isMobile = !!changes.find(change => change.mqAlias === 'lt-md');
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  // public functions

  public ngOnInit() {
    
    let useDefaultDate: boolean = true;

    // creates a form group for the program availability
    this.createFormGroup();

    // set the initial Date based on a valid program start Date in the current year
    while ( this.validProgramMonths.includes(this.initialDate.getMonth()) === false || this.initialDate.getMonth() === new Date().getMonth()) 
    {
      this.initialDate.setMonth(this.initialDate.getMonth() + 1);
    }

    this.initialDate.setDate(1);

    // create an observable to keep track of selected date form field
    this.programAvailabilityForm
      .get('programStartDate')
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => 
      {

        let programStartDateControl = this.programAvailabilityForm.get('programStartDate');

        // get cached data from the service
        let cachedInfo = this.applicationService.getProgramAvailabilityData();

        if (cachedInfo && cachedInfo.value) 
        {
          let programStartDateValue = cachedInfo.value.programStartDate;

          if (programStartDateControl.value != programStartDateValue) 
          {
            this.loadProgramList(programStartDateValue);
            this.programAvailabilityForm.get('programStartDate').setValue(programStartDateValue);
          }
        }
        else 
        {
          if (programStartDateControl.valid) 
          {
            this.loadProgramList(programStartDateControl.value);
          }
          else 
          {
            if (this.dataSource) 
            {
              this.dataSource = null;
            }
          }
        }

        this.applicationService.setProgramAvailabilityData(this.programAvailabilityForm.value);

      });

    if (useDefaultDate) {
     
      // set the current date for the program start date field
      this.programAvailabilityForm.get('programStartDate').setValue(this.initialDate);
    }
  }

  public loadProgramList(programStartDate: Date) {
    
    this.programListData.list = null;

    this.selectedStartDate = programStartDate;

    this.httpServiceAI.getAIRequest("getApplicationInfo").subscribe
      (
        appInfo => {
          this.appInfo = appInfo;

          if (appInfo.countryOA) 
          {
            this.isLoading = false;

            // the get request for the program list API requires an IProgramListReqParamPayload param
            const reqParams: IProgramListReqParams =
            {
              year: this.selectedStartDate.getFullYear(),
              month: this.selectedStartDate.getMonth() + 1,
              visa: appInfo.countryOA
            };

            this.getProgramLists(reqParams).subscribe
            (
              res => {
                this.programListData.loading = false;
                this.programListData.list = res;

                if (this.programListData.list.length > 0) {
                  this.isLoadingError = false;

                  this.dataSource = new MatTableDataSource(this.programListData.list);

                  setTimeout(() => (this.dataSource.paginator = this.paginator));
                }
                else {
                  this.isLoadingError = false;

                  this.dataSource = new MatTableDataSource(null);
                }
              },
              err => {
                this.commonUtilsService.showErrors('Unable to get list of programs');
              }
            )
          }
          else 
          {
            this.commonUtilsService.showErrors('Unable to get user info');
          }
        }
      );
  }

  public onSaveClick(event: Event) {

    // prevent page refresh onSubmit action
    event.preventDefault();

    if (this.programAvailabilityForm.valid) {

      //store saved data into the service variable
      this.applicationService.setProgramAvailabilityData(this.programAvailabilityForm);

      this.applicationService.setLandingRoute(2);
    }
  }

  public getErrorMessages(control: FormControl) {
    
    if (control.invalid) 
    {
      return 'Please select a valid date';
    } 
    else 
    {
      return '';
    }
  }

  public dateFilter(date: Date): boolean 
  {
    const validProgramMonths: number[] = [0, 4, 8];
    return validProgramMonths.includes(date.getMonth());
  };

  public onMonthSelected(selectedDate, datePicker: MatDatepicker<Date>) 
  {
    this.programAvailabilityForm.get('programStartDate').setValue(new Date(selectedDate));
    datePicker.close();
  }

  public applyFilter(filterValue: string) {

    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public ngOnDestroy()
  {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  // private functions
  private createFormGroup() 
  {
    this.programAvailabilityForm = this.formBuilder.group({programStartDate: [null, Validators.required] });
  }

  private getProgramLists(params: IProgramListReqParams): Observable<IProgram[]>
  {
    if (params.year !== 0 && params.month !== 0) 
    {
      return this.httpServicePrg.postRequest("getAvailablePrograms", params) as Observable<IProgram[]>;
    }
    else 
    {
      return this.httpServicePrg.getPrgRequest("getAllPrograms") as Observable<IProgram[]>;
    }
  };

  private getProgramAvailabilityFormValue(controlName: string): any 
  {
    let returnValue = null;

    Object.entries(this.programAvailabilityForm.value).forEach(([key, value]) => {
      if (key === controlName) {
        returnValue = value;
      }
    });

    return returnValue;
  }

  private setProgramAvailabilityFormValue(controlName: string, savedValue: any) {

    Object.entries(this.programAvailabilityForm.value).map(([key, value]) => {
      if (key === controlName) {
        this.programAvailabilityForm.value[key] = savedValue;
      }
    });
  }
}
