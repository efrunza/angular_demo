import { IAppError } from './shared.models';

export interface IProgramListItemState {
  id: string;
  list: IProgram[];
  loading: boolean;
  error: any;
  year: number;
  month: number;
  visa: string;
}

export interface IProgramListItem {
  id: string;
  list: IProgram[];
  year: number;
  month: number;
  visa: string;
}

export interface IProgram {
  programCode: string;
  programDesc: string;
  campus: string;
  acadPlan: string;
  acadCareer: string;
}

export interface IProgramListForm {
  data: IProgram[];
  loading: boolean;
}

export interface IProgramListReqParams {
  year: number;
  month: number;
  visa: string;
}

export interface IProgramListReqParamPayload extends IProgramListReqParams {
  id: string;
}

export interface IProgramListError {
  id: string;
  error: IAppError;
}
