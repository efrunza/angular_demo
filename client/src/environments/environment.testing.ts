import { commonEnv } from './environment.common';

const clientId = 'c83d2b16-0a42-40ce-bdaf-41bb8e6aba02';
const tenant = 'iaptstb2c.onmicrosoft.com';
const scopes = ['https://iaptstb2c.onmicrosoft.com/api/read'];
const appUrl = 'https://iap-tst.senecacollege.ca';
const azureInstance = `https://iaptstb2c.b2clogin.com/tfp`;

export const environment = {
  production: true,
  appUrl: appUrl,
  scopes: scopes,
  clientId: clientId,
  apiUrl: 'https://iap-apims-api01tst.azure-api.net/api/iwa-api',
  // TODO: remove in prod
  // apiUrl: 'http://localhost:5200/iwa-api',
  apiSubscriptionKey: 'sdfsdf',
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
