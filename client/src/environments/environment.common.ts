const applicantSignInPolicy = 'B2C_1_signupsignin';
const agentSignInPolicy = 'B2C_1_agentsignupsignin';
const resetPasswordPolicy = 'B2C_1_resetpassword';
const azureInstance = `https://login.microsoftonline.com/tfp`;
const azureInstance_v2 = `https://IAPDEVB2C.b2clogin.com/tfp`;
const azureApplicantCallbackUrl = 'application';
const azureAgentCallbackUrl = 'agent';

export const commonEnv = {
  applicantSignInPolicy,
  agentSignInPolicy,
  azureInstance,
  azureInstance_v2,
  azureApplicantCallbackUrl,
  azureAgentCallbackUrl,
  resetPasswordPolicy
};
