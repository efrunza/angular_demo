export interface IApplicant {
  Id: number,
  LastName: string,
  FirstName: string,
  Phone: string,
  Email: string
}

export class Agent{
  Id: number;
  LastName: string;
  FirstName: string;
  Phone: string;
  Email: string;
}
export class ContactRequest {
  personalData: PersonalData
  requestType: any = ''
  text: string = ''
}

export class PersonalData {
  email: string = ''
  mobile: string = ''
  country: string = ''
}

export class PriceDetails {
  PId:number;
  MonthlyPrice:number;
  NumberOfUsers:number;
  Data:string;
  AdditionalSupport:string;
}