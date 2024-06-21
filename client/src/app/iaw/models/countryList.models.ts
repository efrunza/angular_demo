// Models for the Get Countries List API (GET Method)

export interface ICountry {
  code: string;
  name: string;
  provinceList?: IState[];
}

export interface IState {
  code: string;
  name: string;
}
