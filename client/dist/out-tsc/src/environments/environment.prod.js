import { commonEnv } from './environment.common';
var clientId = 'fe6d2680-1079-43ee-a230-3002ec2ab4d1';
var tenant = 'IAPPRDB2C.onmicrosoft.com';
var scopes = ['https://IAPPRDB2C.onmicrosoft.com/api/read'];
var appUrl = 'https://intl.senecacollege.ca';
var azureInstance = "https://IAPPRDB2C.b2clogin.com/tfp";
export var environment = {
    production: true,
    appUrl: appUrl,
    scopes: scopes,
    clientId: clientId,
    apiUrl: 'https://iap-apims-api01pd.azure-api.net/api/iwa-api',
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
//# sourceMappingURL=environment.prod.js.map