// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { commonEnv } from './environment.common';

const appUrl = 'https://iap-sbx-web.azurewebsites.net';
const clientId = '62c89ac4-66b1-4ce6-ad08-60a7bd1501eb';
const tenant = 'iapsbxb2c.onmicrosoft.com';
const scopes = ['https://iapsbxb2c.onmicrosoft.com/api/read'];
const azureInstance = commonEnv.azureInstance;

export const environment = {
  production: true,
  appUrl: appUrl,
  scopes: scopes,
  clientId: clientId,
  apiUrl: 'https://iap-sbx-api1.azure-api.net/api/iwa-api',
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
