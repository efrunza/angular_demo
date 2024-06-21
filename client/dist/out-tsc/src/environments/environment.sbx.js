// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { commonEnv } from './environment.common';
var appUrl = 'https://iap-sbx-web.azurewebsites.net';
var clientId = '62c89ac4-66b1-4ce6-ad08-60a7bd1501eb';
var tenant = 'iapsbxb2c.onmicrosoft.com';
var scopes = ['https://iapsbxb2c.onmicrosoft.com/api/read'];
var azureInstance = commonEnv.azureInstance;
export var environment = {
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
//# sourceMappingURL=environment.sbx.js.map