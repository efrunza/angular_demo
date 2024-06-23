import { commonEnv } from './environment.common';

const clientId = '';
const tenant = '.onmicrosoft.com';
const scopes = ['https://.onmicrosoft.com/api/read'];
const appUrl = 'https://.azurewebsites.net';
const azureInstance = commonEnv.azureInstance_v2;

export const environment = {
  production: true,
  appUrl: appUrl,
  scopes: scopes,
  clientId: clientId,
  apiUrl: 'https://iap-apims-api01dv.azure-api.net/api/iwa-api',
  // TODO: remove in prod
  // apiUrl: 'http://localhost:5200/iwa-api',
  apiSubscriptionKey: '',
  apiSubscriptionEnabled: true,
  agentSignInPolicy: commonEnv.agentSignInPolicy,
  applicantSignInPolicy: commonEnv.applicantSignInPolicy,
  azureInstance: azureInstance,
  tenant: tenant,
  msalApplicantConfigs: {
    clientID: clientId,
    authority: `${azureInstance}/${tenant}/${commonEnv.applicantSignInPolicy}`,
    validateAuthority: false,
    consentScopes: scopes,
    redirectUri: `${appUrl}/${commonEnv.azureApplicantCallbackUrl}`,
    cacheLocation: 'sessionStorage',
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: `${appUrl}/${commonEnv.azureApplicantCallbackUrl}`,
    storeAuthStateInCookie: true
  },
  msalAgentConfigs: {
    clientID: clientId,
    authority: `${azureInstance}/${tenant}/${commonEnv.agentSignInPolicy}`,
    validateAuthority: false,
    consentScopes: scopes,
    redirectUri: `${appUrl}/${commonEnv.azureAgentCallbackUrl}`,
    cacheLocation: 'sessionStorage',
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: `${appUrl}/${commonEnv.azureAgentCallbackUrl}`,
    storeAuthStateInCookie: true
  }
};
