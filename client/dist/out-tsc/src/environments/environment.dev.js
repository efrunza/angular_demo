import { commonEnv } from './environment.common';
var clientId = 'b4b2ba85-f33b-4770-8521-10a76522b8d8';
var tenant = 'iapdevb2c.onmicrosoft.com';
var scopes = ['https://iapdevb2c.onmicrosoft.com/api/read'];
var appUrl = 'https://iap-appsvc-web01dv.azurewebsites.net';
var azureInstance = commonEnv.azureInstance_v2;
export var environment = {
    production: true,
    appUrl: appUrl,
    scopes: scopes,
    clientId: clientId,
    apiUrl: 'https://iap-apims-api01dv.azure-api.net/api/iwa-api',
    // TODO: remove in prod
    // apiUrl: 'http://localhost:3000/iwa-api',
    apiSubscriptionKey: 'sdfsdf',
    apiSubscriptionEnabled: true,
    agentSignInPolicy: commonEnv.agentSignInPolicy,
    applicantSignInPolicy: commonEnv.applicantSignInPolicy,
    azureInstance: azureInstance,
    tenant: tenant,
    msalApplicantConfigs: {
        clientID: clientId,
        authority: azureInstance + "/" + tenant + "/" + commonEnv.applicantSignInPolicy,
        validateAuthority: false,
        consentScopes: scopes,
        redirectUri: appUrl + "/" + commonEnv.azureApplicantCallbackUrl,
        cacheLocation: 'sessionStorage',
        navigateToLoginRequestUrl: false,
        postLogoutRedirectUri: appUrl + "/" + commonEnv.azureApplicantCallbackUrl,
        storeAuthStateInCookie: true
    },
    msalAgentConfigs: {
        clientID: clientId,
        authority: azureInstance + "/" + tenant + "/" + commonEnv.agentSignInPolicy,
        validateAuthority: false,
        consentScopes: scopes,
        redirectUri: appUrl + "/" + commonEnv.azureAgentCallbackUrl,
        cacheLocation: 'sessionStorage',
        navigateToLoginRequestUrl: false,
        postLogoutRedirectUri: appUrl + "/" + commonEnv.azureAgentCallbackUrl,
        storeAuthStateInCookie: true
    }
};
//# sourceMappingURL=environment.dev.js.map