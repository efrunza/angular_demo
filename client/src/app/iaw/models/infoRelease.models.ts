export interface IInfoRelease {
  id: string;
  info: IInfo;
}

export interface IInfo {
  relationship: string;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: {
    countryCode: string;
    number: string;
  };
  cellPhone: {
    countryCode: string;
    number: string;
  };
  email: string;
}

export class InfoRelease implements IInfoRelease {
  constructor(public id: string, public info = null) {}
}
