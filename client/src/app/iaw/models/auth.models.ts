import { MSALError } from '@azure/msal-angular/dist/MSALError';

export interface IAgentVerificationResult {
  agentId: string;
}

export enum EMSALStatus {
  FORGOT_PASSWORD = 'AADB2C90118',
  SESSION_TIME_OUT = 'AADB2C90077',
  CANCEL_RESET_PASSWORD = 'AADB2C90091',
  MULTIPLE_ACCOUNTS = 'AADB2C90273'
}

export interface ICacheResult {
  errorDesc: string;
  token: string;
  error: string;
}

export interface IMsalStoredToken {
  accessToken: string;
  idToken: string;
  expiresIn: string;
  clientInfo: string;
}

export enum EMsalItemType {
  LOGIN_FAILURE = 'msal:loginFailure',
  LOGIN_SUCCESS = 'msal:loginSuccess',
  ACQUIRE_TOKEN_SUCCESS = 'msal:acquireTokenSuccess',
  ACQUIRE_TOKEN_FAILURE = 'msal:acquireTokenFailure'
}

export interface MsalItem {
  type: string;
  payload: MSALError;
}
