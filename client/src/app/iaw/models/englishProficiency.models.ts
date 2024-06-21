export enum EEliOption {
  SUBMIT_SCORE = '1',
  ATTEND_ELI = '2',
  ATTEND_PARTNERSHIP_INSTITUTIONS = '3',
  NOT_APPLICABLE = '4'
}

export interface IEnglishTest {
  name: string;
  score: string;
  date: Date;
  country: string;
}

export interface IEnglishPartner {
  name: string;
  dateCompletion: Date;
}

export interface IEnglishProficiency {
  id: string;
  eliOption: EEliOption;
  test: IEnglishTest;
  partner: IEnglishPartner;
  uploadDocument: boolean;
}

export interface IEnglishProficiencyAPI {
  EliOption: string;
  TestName: string;
  TestScore: string;
  TestDate: Date;
  TestCountry: string;
  PartnerName: string;
  PartnerDateCompletion: Date;
  uploadDocument: boolean;
}

export class EnglishProficiency implements IEnglishProficiency {
  constructor(
    public id: string,
    public eliOption: EEliOption = null,
    public test: IEnglishTest = null,
    public partner: IEnglishPartner = null,
    public uploadDocument: boolean = false
  ) {}
}
