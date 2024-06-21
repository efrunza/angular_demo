import { ICountry } from './countryList.models';
import { ILanguage } from './languageList.models';
import { IPhone } from '../models';

export interface IPersonalInfo {
  appId: string;
  isPreviousStudent: boolean;
  previousStudentID: string;
  title: string;
  surName: string;
  firstName: string;
  otherNames: string;
  gender: string;
  dob: Date;
  email: string;
  countryOB: ICountry['code'];
  countryOC: ICountry['code'];
  countryOA: ICountry['code'];
  primaryLang: ILanguage['code'];
  permanentAddress: IAddress;
  currAddrSameAsPerm: boolean;
  mailingAddress: IAddress;
}

export interface IAddress {
  country: ICountry['code'];
  stAddress: string;
  stAddress2: string;
  city: string;
  province: string;
  zipCode: string;
  phone?: IPhone;
  cell?: IPhone;
}

export interface IPersonalInfoState {
  data: IPersonalInfo,
  loading: boolean,
  error: boolean,
  saving: boolean
}

export interface IPersonalInfoForm {
  data: {
    appId: string;
    isPreviousStudent: boolean;
    previousStudentID: string;
    title: string;
    surName: string;
    firstName: string;
    otherNames: string;
    gender: string;
    dob: Date;
    countryOB: ICountry['code'];
    countryOC: ICountry['code'];
    countryOA: ICountry['code'];
    primaryLang: ILanguage['code'];
    permanentAddress;
    currAddrSameAsPerm: boolean;
    mailingAddress;
  };
  loading: boolean;
  error?: any;
  saving: boolean;
}

export class PersonalInfo implements IPersonalInfo {
  appId: string;
  isPreviousStudent = false;
  previousStudentID: string = null;
  title: string = null;
  surName: string = null;
  firstName: string = null;
  otherNames: string = null;
  gender: string = null;
  dob: Date = null;
  email: string = null;
  countryOB: string = null;
  countryOC: string = null;
  countryOA: string = null;
  primaryLang: string = null;
  permanentAddress: IAddress = {
    country: null,
    province: null,
    city: null,
    stAddress: null,
    stAddress2: null,
    zipCode: null,
    phone: {
      countryCode: null,
      number: null
    },
    cell: {
      countryCode: null,
      number: null
    }
  };
  currAddrSameAsPerm = false;
  mailingAddress: IAddress = {
    country: null,
    province: null,
    city: null,
    stAddress: null,
    stAddress2: null,
    zipCode: null
  };
}
