import { IProgram } from './programList.models';

export interface IProgramChoiceApp {
  applicationId: string;
  choices: IProgramChoice[];
}

export interface IProgramChoice {
  startDate: Date | string;
  program: string;
  campus: string;
  description: string;
  acadPlan: string;
  acadCareer: string;
}

export interface IProgramChoiceForm {
  data: IProgramChoiceApp;
  loading: boolean;
  error?: any;
}

export interface IProgramDialogData {
  programs: IProgram[];
  currentProgramChoices: string[];
}

export class ProgramChoiceApp implements IProgramChoiceApp {
  constructor(
    public applicationId: string = '',
    public choices: IProgramChoice[] = []
  ) {}
}
