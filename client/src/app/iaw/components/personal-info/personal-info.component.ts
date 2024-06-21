import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { EUserType, ICountry, ILanguage, IPersonalInfoState, IState} from '../../../iaw/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonUtilsService } from '../../../iaw/services/common-utils.service';
import { HttpServicePI, HttpServiceCtry, HttpServiceLng } from '../../../iaw/services/application-http.service';
import { ApplicationService } from '../../../iaw/services/application.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { Helper } from '../../../shared/common/helper';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy 
{

  // add a comment to test the GIT formatting
  public personalEmail = "eugen.frunza@senecacollege.ca";

  public personalInfoForm: FormGroup;
  public userType: EUserType;
  public userTypeEnum = EUserType;
  public languageList: ILanguage[];
  public countryList: ICountry[];
  public permanentProvinceList: IState[];
  public mailingProvinceList: IState[];
  public pageLoadState: IPersonalInfoState;

  //let observable know when to unsubscribe, will be marked as completed whenever the form is destroyed
  destroyed$ = new Subject();

  //holding saving status when the submit button is clicked
  saving$: Observable<boolean>;

  constructor
  (
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    public  formValidationService: FormValidationService,
    private httpServicePI: HttpServicePI,
    private httpServiceLng: HttpServiceLng,
    private httpServiceCtry: HttpServiceCtry,
    private applicationService: ApplicationService,
    private commonUtilsService: CommonUtilsService
  ) 
  {

    this.userType = EUserType.Applicant;

    this.pageLoadState = {
      data: null,
      loading: false,
      error: null,
      saving: false
    };

    this.languageList = null;
    this.countryList = null;
    this.permanentProvinceList = null;
    this.mailingProvinceList = null;

    let cachedInfo = this.applicationService.getPersonalInfo();

    if (cachedInfo) {
      this.httpServicePI.refreshPIRequest();
    }

    this.httpServiceCtry.getCtryRequest("getProvincesStates", "countriesList").subscribe(
      result => {
        this.countryList = result;
      }
    );

    this.httpServiceLng.getLngRequest("getLanguageCodes", "QasData").subscribe(
      result => {
        this.languageList = result;
      }
    );
  }

  public ngOnInit() {

    // this is a flag used to display or hide the spinner control
    this.pageLoadState.loading = true;

    // creates a form group for the personal information form
    this.createFormGroup();

    // load the dropdowns with observable data
    this.loadAddressControl('permanentAddress', 'country');
    this.loadAddressControl('mailingAddress', 'country');

    this.loadFormData();

    // detect flag changes in the form and dynamically update form validators based on the changes
    this.detectFlagChanges();
  }

  public ngAfterViewInit(): void {
  }

  public ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  public detectFlagChanges(): void 
  {

    Object.entries(this.personalInfoForm.value).forEach(([key, value]) => {

      this.loadControlUIChanges(key);
    });

    this.resetGroupControlState('currAddrSameAsPerm', 'mailingAddress', true);
    this.resetControlState('isPreviousStudent', 'previousStudentID', false);
  }

  public onSaveClick(event: Event) 
  {

    // prevent page refresh onSubmit action
    event.preventDefault();

    // Clearing unused form fields
    this.clearFields(this.personalInfoForm);

    if (this.personalInfoForm.valid) 
    {

      // save data via a http post
      this.httpServicePI.postRequest("storeApplicantBioData", this.personalInfoForm.value).subscribe();

      // store saved data into the service variable
      this.applicationService.setPersonalInfo(this.personalInfoForm.value);

      // perform navigation
      //this.applicationService.toggleComplete("personal-info");
      this.applicationService.setLandingRoute(1);

      this.cdr.detectChanges();
    }
    else 
    {
      this.commonUtilsService.showErrors("Your data is invalid, please go back and fix the errors.");
    }
  }

  //fill the zipCode field in case somebody does not have zipCode in there country
  public fillDefaultZipCode() {
    this.personalInfoForm.get('permanentAddress').get('zipCode').setValue('00000');
  }

  public DisplayErrorMessage(control: FormControl): string {
    return this.formValidationService.getErrorMessage(control);
  }

  public ngOnDestroy() {
    this.cdr.detach();
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  // private methods
  // -------------------------------------------------------------------------------------------------------------

  //creates the personalInfoForm form group for the html template
  private createFormGroup() 
  {
    
    // personal information form group
    this.personalInfoForm = this.formBuilder.group
      (
        {
          appId:                  Helper.CreateSimpleFormControl(),
          isPreviousStudent:      Helper.CreateBooleanProperty(false),
          previousStudentID:      Helper.CreateNumberInRange(),
          title:                  Helper.CreateRequiredFormControl(),
          surName:                Helper.CreateRequiredSenecaOnlyLettersControl(1),
          firstName:              Helper.CreateSenecaOnlyLettersControl(2),
          otherNames:             Helper.CreateSimpleFormControl(),
          gender:                 Helper.CreateRequiredFormControl(),
          dob:                    Helper.CreateRequiredFormControl(),
          countryOB:              Helper.CreateRequiredFormControl(),
          countryOC:              Helper.CreateRequiredFormControl(),
          countryOA:              Helper.CreateRequiredFormControl(),
          primaryLang:            Helper.CreateRequiredFormControl(),
          email:                  Helper.CreateRequiredEmailControl(),
          permanentAddress: this.formBuilder.group
            (
              {
                country:          Helper.CreateRequiredFormControl(),
                province:         Helper.CreateSimpleFormControl(),
                city:             Helper.CreateRequiredSenecaOnlyLettersControl(2),
                stAddress:        Helper.CreateRequiredSenecaOnlyLettersControl(1),
                stAddress2:       Helper.CreateSenecaOnlyLettersControl(1),
                zipCode:          Helper.CreateRequiredSenecaOnlyLettersControl(1),
                phone:            Helper.CreatePhoneNumbersControl(0),
                cell:             Helper.CreatePhoneNumbersControl(1)
              }
            ),
          currAddrSameAsPerm: Helper.CreateBooleanProperty(false),
          mailingAddress: this.formBuilder.group
            (
              {
                country:          Helper.CreateSimpleFormControl(),
                province:         Helper.CreateSimpleFormControl(),
                city:             Helper.CreateSenecaOnlyLettersControl(2),
                stAddress:        Helper.CreateSenecaOnlyLettersControl(1),
                stAddress2:       Helper.CreateSenecaOnlyLettersControl(1),
                zipCode:          Helper.CreateSenecaOnlyLettersControl(1),
              },
              {
                validator: this.requiredIf(this.personalInfoForm, 'currAddrSameAsPerm')
              }
            )
        },
        {
          validator: this.requiredIf(this.personalInfoForm, 'isPreviousStudent')
        }
      );
  }

  //select the data state of store
  private loadFormData()
   {

    this.httpServicePI.getPIRequest("getApplicantBioData").subscribe((result) => {

      // get cached data from the service
      let cachedInfo = this.applicationService.getPersonalInfo();

      if (cachedInfo) {
        result = Object.assign(cachedInfo);
      }

      this.personalInfoForm.patchValue(result);

      this.personalInfoForm.enable();

      this.personalInfoForm.get('email').setValue(this.personalEmail);

      setTimeout(() => {

        this.pageLoadState = {
          data: result,
          loading: false,
          error: false,
          saving: false
        };
      });

      this.pageLoadState.loading = true;
    },
    err => {
      this.personalInfoForm.disable();

      this.pageLoadState.loading = false;
      this.pageLoadState.error = true;

      this.commonUtilsService.showErrors("Cannot load personal info data.");
    });
  }

  private loadAddressControl(controlName: string, dependentControlName: string) {
    
    const address = this.personalInfoForm.get(controlName);
    const selectedCountry: AbstractControl = this.personalInfoForm.get(controlName).get(dependentControlName);

    selectedCountry.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.loadProvinceListByCountry(address, selectedCountry, controlName);
      });
  }

  private getProvinceListByCountry(addressType: AbstractControl, selectedCountry: AbstractControl, name1: string): IState[] {

    this.permanentProvinceList = [];

    if (this.countryList) {

      const countryByCode = this.countryList.find(
        country => country.code === selectedCountry.value
      );

      if (addressType === this.personalInfoForm.get(name1)) {
        if (countryByCode && countryByCode.provinceList) {
          this.permanentProvinceList = countryByCode.provinceList;
        }
      }
    }

    return this.permanentProvinceList;
  }

  private loadProvinceListByCountry(addressType: AbstractControl, selectedCountry: AbstractControl, name1: string)
  {
    
    let provinceList: IState[] = this.getProvinceListByCountry(addressType, selectedCountry, name1);

    if (name1 === "permanentAddress") {
      this.permanentProvinceList = provinceList;
    }
    else {
      this.mailingProvinceList = provinceList;
    }
  }

  private resetControlState(controlName: string, dependentControlName: string, isCondition: boolean) 
  {
    
    this.personalInfoForm.controls[controlName].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.cdr.detectChanges();

        const dependantControl = this.personalInfoForm.get(dependentControlName);

        if (this.personalInfoForm.controls[controlName].value === isCondition) {
          dependantControl.clearValidators();
          dependantControl.setErrors(null);
        }
        dependantControl.updateValueAndValidity();
      });
  }

  private resetGroupControlState(controlName: string, dependentControlName: string, isCondition: boolean) 
  {
    
    this.personalInfoForm.controls[controlName].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.cdr.detectChanges();

        const subForm = this.personalInfoForm.get(dependentControlName);

        if (this.personalInfoForm.controls[controlName].value === isCondition) {
          subForm.clearValidators();
          subForm.setErrors(null);
          Object.keys((subForm as FormGroup).controls).forEach(item => {
            (subForm as FormGroup).controls[item].setErrors(null);
          });
        }
        subForm.updateValueAndValidity();
      });
  }

  private loadControlUIChanges(controlName: string) 
  {
    
    this.personalInfoForm.controls[controlName].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {

        this.cdr.detectChanges();

        const control = this.personalInfoForm.get(controlName);

        if (control.value !== this.getPersonalInfoFormValue(controlName)) {

          this.setPersonalInfoFormValue(controlName, control.value);

          this.applicationService.setPersonalInfo(this.personalInfoForm.value);
        }
      });
  }

  private getPersonalInfoFormValue(controlName: string): any 
  {
    let returnValue = null;

    Object.entries(this.personalInfoForm.value).forEach(([key, value]) => {
      if (key === controlName) {
        returnValue = value;
      }
    });

    return returnValue;
  }

  private setPersonalInfoFormValue(controlName: string, savedValue: any) 
  {

    Object.entries(this.personalInfoForm.value).map(([key, value]) => {
      if (key === controlName) {
        this.personalInfoForm.value[key] = savedValue;
      }
    });
  }

  // clearing unused form fields
  private clearFields(form: FormGroup) 
  {
    this.clearField(form, false, 'previousStudentID');

    this.clearFormGroupField(form, true, 'mailingAddress');
  }

  private clearField(form: FormGroup, isCondition: boolean, fieldName: string) 
  {
    let controlValue = form.get(fieldName).value;

    if (controlValue === isCondition) {
      form.get(fieldName).setErrors(null);
      form.get(fieldName).clearValidators();
      form.get(fieldName).updateValueAndValidity();
    }
  }

  private clearFormGroupField(form: FormGroup, isCondition: boolean, fieldName: string)
  {
    let controlValue = form.get(fieldName).value;

    if (controlValue === isCondition) 
    {
      Object.keys(controlValue.controls).forEach(key => 
      {
        const control = controlValue.get(key);
        control.setErrors(null);
        control.clearValidators();
        control.updateValueAndValidity();
      });
    }
  }

  //custom validator that takes a formGroup and a string representing a formControlName
  //sets the formControls inside that formGroup to required IF the passed formControlName to the function has a value
  private requiredIf(form: FormGroup, fieldName: string): ValidationErrors | null 
  {
    if (form && form.controls && form.controls[fieldName] && 
      (form.controls[fieldName].value === null || form.controls[fieldName].value === false)) 
    {
      return { required: true };
    } 
    else return null;
  }
}
