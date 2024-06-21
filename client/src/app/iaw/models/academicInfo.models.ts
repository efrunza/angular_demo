export enum ESchoolLevel {
  HIGH_SCHOOL = 'High School',
  COLLEGE = 'College',
  UNIVERSITY = 'University',
  MASTER = 'Master'
}

export interface IAcademicInfo {
  id: string;
  schoolsAttended: ISchoolInfo[];
}

export interface ISchoolInfo {
  name: string;
  level: ESchoolLevel;
  graduatedFlag: boolean;
  uploadDocumentsFlag: boolean;
}

export interface IAcademicInfoForm {
  data: {
    id: string;
    highSchool: ISchoolInfo;
    postSecondaryEdus: ISchoolInfo[];
  };
  loading: boolean;
  error?: any;
}

export class SchoolInfo implements ISchoolInfo {
  constructor(
    public name = null,
    public level = ESchoolLevel.HIGH_SCHOOL,
    public graduatedFlag = true,
    public uploadDocumentsFlag = true
  ) {}
}

export class AcademicInfo implements IAcademicInfo {
  constructor(public id: string, public schoolsAttended: ISchoolInfo[] = []) {}
}
