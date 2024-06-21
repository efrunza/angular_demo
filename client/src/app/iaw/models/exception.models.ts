import { IErrorBase } from './shared.models';

export enum EExceptionTypes {
  INFO_MISSING = 'AAA112',
  INVALID_AGENT_LOGIN = 'AAA123',
  INVALID_USER_INFO = 'AAA125',
  EXPIRED_AGENT = 'AAA435',
  UNABLE_TO_VERIFY_AGENT = 'AAA543',
  GENERAL_EXCEPTION = 'ADS342'
}

export class InfoMissingException extends Error implements IErrorBase {
  constructor(
    public id: string = EExceptionTypes.INFO_MISSING,
    public message: string = 'critical info is missing, please try again.'
  ) {
    super(message);
    Object.setPrototypeOf(this, InfoMissingException.prototype);
  }
}

export class InvalidAgentLoginException extends Error implements IErrorBase {
  constructor(
    public id: string = EExceptionTypes.INVALID_AGENT_LOGIN,
    public message: string = 'invalid agent login'
  ) {
    super(message);
    Object.setPrototypeOf(this, InvalidAgentLoginException.prototype);
  }
}

export class InvalidUserInfoException extends Error implements IErrorBase {
  constructor(
    public id: string = EExceptionTypes.INVALID_USER_INFO,
    public message: string = 'cannot add user info'
  ) {
    super(message);
    Object.setPrototypeOf(this, InvalidUserInfoException.prototype);
  }
}

export class ExpiredAgentException extends Error implements IErrorBase {
  constructor(
    public id: string = EExceptionTypes.EXPIRED_AGENT,
    public message: string = 'the agent is expired'
  ) {
    super(message);
    Object.setPrototypeOf(this, ExpiredAgentException.prototype);
  }
}

export class UnableToVerifyAgentException extends Error implements IErrorBase {
  constructor(
    public id: string = EExceptionTypes.UNABLE_TO_VERIFY_AGENT,
    public message: string = 'unable to verify agent'
  ) {
    super(message);
    Object.setPrototypeOf(this, UnableToVerifyAgentException.prototype);
  }
}

export class GeneralException extends Error implements IErrorBase {
  constructor(
    public id: string = EExceptionTypes.GENERAL_EXCEPTION,
    public message: string = 'something went wrong.. please try again later'
  ) {
    super(message);
    Object.setPrototypeOf(this, GeneralException.prototype);
  }
}
