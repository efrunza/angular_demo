export interface IUser {
  oid: string;
  name: string;
  given_name: string;
  emails: Array<string>;
  city: string;
  aud: string;
  auth_time: number;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  nonce: string;
  sub: string;
  tfp: string;
  ver: string;
  agentId: string;
}

// Interface for the appId and the lastStep completed by a user
export interface IApplicantInfo {
  status: string;
  appId: string;
  lastStep: number;
  EliOption: string;
  countryOA: string;
}

export class ApplicantInfo implements IApplicantInfo {
  status: string = null;
  appId: string = null;
  lastStep: number = null;
  EliOption: string = null;
  countryOA: string = null;
}

export enum EUserType {
  Applicant = 'applicant',
  Agent = 'agent'
}
