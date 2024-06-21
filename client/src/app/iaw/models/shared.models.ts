import { IProgram } from '../models/programList.models';
import { PersonalInfoComponent } from '../components/personal-info/personal-info.component';

export interface IErrorSnackBar {
  error: IAppError;
  messageFactory?: Function;
  callback?: Function;
  actionName?: ESnackbarAction;
}

export interface IErrorBase {
  id: string;
  message: string;
}

export interface IAppError extends IErrorBase {
  type: string;
}

export enum EErrorType {
  LOAD = 'load',
  SUBMIT = 'submit'
}

export enum ESnackbarAction {
  REFRESH = 'Refresh',
  DISMISS = 'Dismiss',
  NAVIGATE = 'Go'
}

export class OpenSubmitErrorBar {
  constructor(
    public message: string = 'There was an issue submitting the form. Please try again',
    public callback: Function = null,
    readonly action = ESnackbarAction.DISMISS
  ) { }
}

export class OpenLoadErrorBar {
  constructor(
    public message: string = 'There was an issue loading the form. Please try again',
    public callback: Function = null,
    readonly action = ESnackbarAction.REFRESH
  ) { }
}

export class AppSubmitError implements IAppError {
  constructor(
    public id: string = 'AA32',
    public message: string = 'something went wrong, please try again later..',
    public readonly type = EErrorType.SUBMIT
  ) { }
}

export class AppLoadError implements IAppError {
  constructor(
    public id: string = 'AA32',
    public message: string = 'something went wrong, please try again later..',
    public readonly type = EErrorType.LOAD
  ) { }
}

export class InfoMissingError implements IErrorBase {
  constructor(
    public id: string = '1',
    public message: string = 'critical info is missing, please try again.'
  ) { }
}

export interface IPhone {
  countryCode: string;
  number: string;
}

export class PhoneNumber implements IPhone {
  constructor(public countryCode = '', public number = '') { }
}

export const ENGLISH_LANGUAGE_INSTITUTE: IProgram = {
  programCode: 'ELI',
  programDesc: 'English Language Institute',
  campus: 'NH',
  acadPlan: 'ELI',
  acadCareer: 'ESD'
};

export interface IDialogError {
  message: string;
  action?: Function;
}

// TODO: use this whenever a route is used instead of hardcoding routes
export const routeList = {
  application: {
    path: 'application',
    children: {
      personalInfo: 'personal-info',
      programList: 'program-availability',
      englishProf: 'english-proficiency',
      programChoice: 'program-choice',
      academicInfo: 'academic-info',
      documentUpload: 'file-up',
      infoRelease: 'info-release',
      review: 'review-submit',
      payment: 'payment'
    }
  },
  complete: 'complete'
};

export const ApplicationStatusObject = {
  new: {
    value: 'new',
    text: 'Not Submitted'
  },
  paid: {
    value: 'paid',
    text: 'Submitted - Under Review'
  },
  complete: {
    value: 'complete',
    text: 'Completed'
  },
  unknown: {
    value: null,
    text: 'Unknown'
  }
};

export interface IApplicationStatusObject {
  new: {
    value: 'new',
    text: 'Not Submitted'
  },
  paid: {
    value: 'paid',
    text: 'Submitted - Under Review'
  },
  complete: {
    value: 'complete',
    text: 'Completed'
  },
  unknown: {
    value: null,
    text: 'Unknown'
  }
};
