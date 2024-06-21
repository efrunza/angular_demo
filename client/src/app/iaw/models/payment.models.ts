import { IAppError } from './shared.models';

//Data needed to load this page
export interface IPayment {
  id: string;
  applicationFee: string | null;
}

//Data needed for Form functionality
export interface IPaymentForm {
  id: string;
  applicationFee: string | null;
  loading: boolean;
  error?: any;
  paid: boolean;
  paymentResponse: IPaymentResponse | null;
  idError: any;
  idLoading: boolean;
  promoValid: boolean;
  promoError: IAppError;
  promoFormError: IAppError;
  checkingPromoCode: boolean;
}

//Sent to Promo Code validation API
export interface IPromoCodeSubmit {
  applicationId: string;
  promoCode: string | null;
}

//Recieved from Promo Code validation API
export interface IPromoCodeSubmitResult {
  message: string;
}

//Recieved from Application Fee API
export interface IApplicationFeeResponse {
  applicationFee: string;
}

export interface IPaymentResponse {
  totalCharge: string;
  responseCode: string;
  transactionStatus: string;
  orderId: string;
  appId: string;
}

export interface IPaymentDialogData {
  transactionStatus: string;
}
