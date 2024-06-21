import { Component, OnInit, ViewChild } from '@angular/core';
import { merge } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PersonalData, ContactRequest, Agent } from '../../models/applicant.model';
import { ActivatedRoute } from '@angular/router';
import { IGender, ICountry, ITitle, ILanguage, IProvinceState } from '../../models/static.model';
import { ValidateUrl, emailDomain, phoneNumberValidator } from '../../shared/validation/custom.validators';
import { FormValidationService } from "../../services/form-validation.service";

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.css']
})
export class PersonalinfoComponent2 implements OnInit {

  StepOneFormPersonalInfo: FormGroup;
  StepTwoProgramAvail: FormGroup;
  StepTreeEnglishPro: FormGroup;
  selectedValue: string;
  isEditable = false;
  genders;
  title;
  country;
  provincestatelist;
  ShowHideProvinceState;
  language;
  isMailingSame;
  ShowHideMailingProvinceState;
  mailingProvinceList;


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    public formValidationService: FormValidationService
  ) { }

  GenderId = new FormControl('', [Validators.required]);
  TitleId = new FormControl('', [Validators.required]);
  BirthCountryId = new FormControl('', [Validators.required]);
  CitizenshipCountryId = new FormControl('', [Validators.required]);
  ApplicationCountryId = new FormControl('', [Validators.required]);
  PrimaryLanguageId = new FormControl('', [Validators.required]);
  PrimaryCountryId = new FormControl('', [Validators.required]);
  //provincestateCtrl = new FormControl('', [Validators.required]);

  ngOnInit() {

/*
    this.genders = {};

    this.title = {};

    this.country = {};

    this.language = {};
    */

    /*
    //this.staticService.getGender().subscribe((gender: Gender) => this.SetGender(gender));
    this.staticService.getGender().subscribe((gender: IGender) => {
      this.genders = gender;
    });
    this.staticService.getTitle().subscribe((title: ITitle) => {
      this.title = title;
    });
    this.staticService.getCountry().subscribe((country: ICountry) => {
      this.country = country;
    });
    this.staticService.getLanguage().subscribe((lang: ILanguage) => {
      this.language = lang;
    });
    */


    this.StepOneFormPersonalInfo = this._formBuilder.group({
      Id: [0, null],
      TitleId: ['', Validators.required],
      LastName: ['', Validators.required],
      FirstName: ['', Validators.required],
      
      // Email: ['', [Validators.required, emailDomain]],
      // Phone: ['', [Validators.required, phoneNumberValidator]],
      
      GenderId: ['', Validators.required],
      //dob: ['', Validators.required],
      BirthCountryId: ['', Validators.required],
      CitizenshipCountryId: ['', Validators.required],
      ApplicationCountryId: ['', Validators.required],
      PrimaryLanguageId: ['', Validators.required],
      PrimaryCountryId: ['', Validators.required],
      PrimaryCityTown: ['', Validators.required],
      PrimaryAddressStreetLine1: ['', Validators.required],
      PrimaryAddressStreetLine2: ['', Validators.required],
      PrimaryPostalCode: ['', Validators.required],
      PrimaryApartmentNo: ['', Validators.required],
      PrimaryPhone: ['', Validators.required],
      SecondaryPhone: ['', Validators.required],
      StateProvince: ['', null],
      ismailingsameCtrl: ['', null],
      mailingSameAsParm: ['', null],
      MailingCountryId: ['', Validators.required],
      MailingProvinceStateId: ['', null],
      MailingCity: ['', null],
      MailingAddressLine1: ['', Validators.required],
      MailingAddressLine2: ['', Validators.required],
      MailingPostalCode:['',null]
    });
    this.StepTwoProgramAvail = this._formBuilder.group({
      //Email: ['', [Validators.required, Validators.email]]
      Address: ['', Validators.required]
    });
    this.StepTreeEnglishPro = this._formBuilder.group({
      agreementCtrl: ['', Validators.required]
    });
    //-----------------------get-----------------------------//
    this.StepOneFormPersonalInfo.get('PrimaryCountryId').valueChanges.subscribe(item => {
      this.ShowHideProvinceState = item;
      /*
      this.staticService.getProvinceState(item).subscribe((province: IProvinceState) => {
        this.provincestatelist = province;
      });
      */
    });

    //-----------------------get-----------------------------//
    this.StepOneFormPersonalInfo.get('MailingCountryId').valueChanges.subscribe(item => {
      this.ShowHideMailingProvinceState = item;
      /*
      this.staticService.getProvinceState(item).subscribe((province: IProvinceState) => {
        this.mailingProvinceList = province;
      });
      */
    });

    this.StepOneFormPersonalInfo.get('mailingSameAsParm').valueChanges.subscribe(item => {
      this.isMailingSame = item;
    })
    //----------for edit-----------------//
    this._activatedRoute.paramMap.subscribe(params => {
      //---in the route we created edit route we set id as param so we get it here---//
      const agentid = +params.get('id');
      if (agentid) {
        this.getAgentbyid(agentid);
      }
    })
  }

  public DisplayErrorMessage(control: FormControl): string {
    return this.formValidationService.getErrorMessage(control);
  }
  getAgentbyid(id) {
    console.log('======XMan=======');
    /*
    this.agentService.getAgentsById(id).subscribe((agent: Agent) => this.editAgent(agent),
      (err: any) => console.log('---error geting by id------' + err));
      */
  }
  editAgent(agent: Agent) {
    this.StepOneFormPersonalInfo.patchValue({
      LastName: agent[0].LastName,
      FirstName: agent[0].FirstName,
      Id: agent[0].Id,
      genderControl: agent[0].GenderId
    });
    this.StepTwoProgramAvail.patchValue({
      Email: agent[0].Email
    })
    this.StepTreeEnglishPro.patchValue({
      agreementCtrl: agent[0].Agreement
    });
    //this.StepOneFormPersonalInfo.setValue({LastName:agent[0].LastName, FirstName:agent[0].FirstName})
  }
  disabledAgreement: boolean = true;
  changeCheck(event) {
    this.disabledAgreement = !event.checked;
  }
  form1() {
    console.log(this.StepOneFormPersonalInfo.value);
  }
  form2() {
    console.log(this.StepTwoProgramAvail.value);
  }
  form3() {

    if (this.StepOneFormPersonalInfo.valid && this.StepTwoProgramAvail.valid && this.StepTreeEnglishPro.valid) {
      const result = Object.assign(this.StepOneFormPersonalInfo.value, this.StepTwoProgramAvail.value, this.StepTreeEnglishPro.value);
      /*
      if (result.Id > 0) {
        this.agentService.updateAgent(result, result.Id);
      } else {
        this.agentService.insertAgent(result);
      }
      */
    } else {
      console.log('--- form is invalid');
    }
  }

  get mobile() {
    return this.StepOneFormPersonalInfo.get('Phone');
  }

  get email() {
    return this.StepOneFormPersonalInfo.get('Email');
  }

}
