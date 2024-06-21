import { commonEnv } from './environment.common';

const clientId = 'fe6d2680-1079-43ee-a230-3002ec2ab4d1';
const tenant = 'IAPPRDB2C.onmicrosoft.com';
const scopes = ['https://IAPPRDB2C.onmicrosoft.com/api/read'];
const appUrl = 'http://localhost:4200';
const azureInstance = `https://IAPPRDB2C.b2clogin.com/tfp`;
export const environment = {
  production: true,
  appUrl: appUrl,
  scopes: scopes,
  clientId: clientId,
  apiUrl: 'http://localhost:5200/api/iwa-api',
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
