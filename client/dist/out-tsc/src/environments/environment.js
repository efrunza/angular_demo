// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { commonEnv } from './environment.common';
var clientId = '62c89ac4-66b1-4ce6-ad08-60a7bd1501eb';
var tenant = 'iapsbxb2c.onmicrosoft.com';
var scopes = ['https://iapsbxb2c.onmicrosoft.com/api/read'];
var appUrl = 'http://localhost:4200';
var azureInstance = commonEnv.azureInstance;
export var environment = {
    production: false,
    appUrl: appUrl,
    scopes: scopes,
    clientId: clientId,
    //apiUrl: 'https://iap-sbx-api1.azure-api.net/api/iwa-api',
    apiUrl: 'http://localhost:3000/api/iwa-api',
    apiSubscriptionKey: 'sdfsdf',
    apiSubscriptionEnabled: true,
    agentSignInPolicy: commonEnv.agentSignInPolicy,
    applicantSignInPolicy: commonEnv.applicantSignInPolicy,
    azureInstance: azureInstance,
    tenant: tenant,
    msalApplicantConfigs: {
        clientID: clientId,
        authority: azureInstance + "/" + tenant + "/" + commonEnv.applicantSignInPolicy,
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
        consentScopes: scopes,
        redirectUri: appUrl + "/" + commonEnv.azureAgentCallbackUrl,
        cacheLocation: 'sessionStorage',
        navigateToLoginRequestUrl: false,
        postLogoutRedirectUri: appUrl + "/" + commonEnv.azureAgentCallbackUrl,
        storeAuthStateInCookie: true
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//# sourceMappingURL=environment.js.map