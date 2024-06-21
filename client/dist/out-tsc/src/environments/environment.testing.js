import { commonEnv } from './environment.common';
var clientId = 'c83d2b16-0a42-40ce-bdaf-41bb8e6aba02';
var tenant = 'iaptstb2c.onmicrosoft.com';
var scopes = ['https://iaptstb2c.onmicrosoft.com/api/read'];
var appUrl = 'https://iap-tst.senecacollege.ca';
var azureInstance = "https://iaptstb2c.b2clogin.com/tfp";
export var environment = {
    production: true,
    appUrl: appUrl,
    scopes: scopes,
    clientId: clientId,
    apiUrl: 'https://iap-apims-api01tst.azure-api.net/api/iwa-api',
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
//# sourceMappingURL=environment.testing.js.map