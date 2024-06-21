import {
  EEliOption,
  ESchoolLevel,
  IAcademicInfo,
  IApplicantInfo,
  IEnglishProficiency,
  IEnglishProficiencyAPI,
  IPersonalInfo,
  IProgram,
  IProgramChoiceApp,
  IProgramListReqParamPayload
} from '../../../models';

export const mockApplicantInfo: IApplicantInfo = {
  status: 'new',
  appId: '123456',
  countryOA: 'Canada',
  EliOption: '4',
  lastStep: 7
};

export const mockAcademicInfo: IAcademicInfo = {
  id: '123456',
  schoolsAttended: [
    {
      name: 'Toronto High School',
      level: ESchoolLevel.HIGH_SCHOOL,
      graduatedFlag: true,
      uploadDocumentsFlag: true
    },
    {
      name: 'University of Toronto',
      level: ESchoolLevel.UNIVERSITY,
      graduatedFlag: true,
      uploadDocumentsFlag: true
    },
    {
      name: 'Some master school',
      level: ESchoolLevel.MASTER,
      graduatedFlag: true,
      uploadDocumentsFlag: false
    }
  ]
};

export const mockFormattedAcademicInfoData = {
  id: mockAcademicInfo.id,
  highSchool: {
    name: 'Toronto High School',
    level: ESchoolLevel.HIGH_SCHOOL,
    graduatedFlag: true,
    uploadDocumentsFlag: true
  },
  postSecondaryEdus: [
    {
      name: 'University of Toronto',
      level: ESchoolLevel.UNIVERSITY,
      graduatedFlag: true,
      uploadDocumentsFlag: true
    },
    {
      name: 'Some master school',
      level: ESchoolLevel.MASTER,
      graduatedFlag: true,
      uploadDocumentsFlag: false
    }
  ]
};

export const mockPersonalInfo: IPersonalInfo = {
  appId: mockApplicantInfo.appId,
  isPreviousStudent: false,
  previousStudentID: null,
  title: 'Mr',
  surName: 'tes',
  firstName: 'esaea',
  otherNames: '',
  gender: 'x',
  dob: new Date('2017-06-06'),
  countryOB: 'DZA',
  countryOC: 'DZA',
  countryOA: 'ALB',
  primaryLang: 'AL',
  email: 'test@test.com',
  permanentAddress: {
    country: 'ALB',
    stAddress: 'dsadas',
    stAddress2: 'dsaasd',
    city: 'asdas',
    province: '',
    zipCode: 'dsadas',
    phone: { countryCode: '321', number: '312312321312' },
    cell: { countryCode: '321', number: '321213213' }
  },
  currAddrSameAsPerm: true,
  mailingAddress: {
    country: 'ALB',
    stAddress: 'dsadas',
    stAddress2: 'dsaasd',
    city: 'asdas',
    province: '',
    zipCode: 'dsadas'
  }
};

export const mockServerError = {
  id: '1',
  message: `hi, I'm a server error message`
};

export const mockProgramChoices: IProgramChoiceApp = {
  applicationId: mockApplicantInfo.appId,
  choices: [
    {
      startDate: '2020-1',
      program: 'ACF',
      campus: 'NH',
      description: 'Accounting and Finance',
      acadPlan: 'ACF',
      acadCareer: 'PSE'
    },
    {
      startDate: '2020-1',
      program: 'ACT',
      campus: 'NH',
      description: 'Accounting Techniques',
      acadPlan: 'ACT',
      acadCareer: 'PSE'
    },
    {
      startDate: '2020-1',
      program: 'AFD',
      campus: 'SY',
      description: 'Art Fundamentals',
      acadPlan: 'AFD',
      acadCareer: 'PSE'
    }
  ]
};

export const mockFormattedProgramChoices: IProgramChoiceApp = {
  applicationId: mockApplicantInfo.appId,
  choices: [
    {
      startDate: new Date(2020, 0),
      program: 'ACF',
      campus: 'Newnham',
      description: 'Accounting and Finance',
      acadPlan: 'ACF',
      acadCareer: 'PSE'
    },
    {
      startDate: new Date(2020, 0),
      program: 'ACT',
      campus: 'Newnham',
      description: 'Accounting Techniques',
      acadPlan: 'ACT',
      acadCareer: 'PSE'
    },
    {
      startDate: new Date(2020, 0),
      program: 'AFD',
      campus: 'Seneca@York',
      description: 'Art Fundamentals',
      acadPlan: 'AFD',
      acadCareer: 'PSE'
    }
  ]
};

export const mockProgramList: IProgram[] = [
  {
    programCode: 'CPA',
    programDesc: 'Computer Programming and Analysis',
    campus: 'NH',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'CPD',
    programDesc: 'Computer Programming Diploma',
    campus: 'SY',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'LSI',
    programDesc: 'Law Enforcement And Security I',
    campus: 'NH',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'MAPA',
    programDesc: 'Public Admin.-Mun.(Accel)',
    campus: 'MK',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'DAMS',
    programDesc: '3-D Digital Animation (Soft)',
    campus: 'SY',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'DTP',
    programDesc: 'Digital Media Tech.Prod.',
    campus: 'SY',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'ECA',
    programDesc: 'Early Childhood Administration',
    campus: 'MK',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'INS',
    programDesc: 'Interdis Studies Degree',
    campus: 'MK',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'MEA',
    programDesc: 'Medical Admin. Assistant',
    campus: 'NH',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'PMT',
    programDesc: 'Pharmaceutical Chem Techy',
    campus: 'NH',
    acadCareer: 'test',
    acadPlan: 'test'
  },
  {
    programCode: 'ELI',
    programDesc: 'Some English Program',
    campus: 'SY',
    acadCareer: 'test',
    acadPlan: 'test'
  }
];

export const mockEnglishProf: IEnglishProficiencyAPI = {
  EliOption: '1' as EEliOption,
  TestName: 'TOEFL',
  TestScore: '84-87',
  TestDate: new Date('2018-06-12T00:00:00.000Z'),
  TestCountry: 'ALB',
  PartnerName: null,
  PartnerDateCompletion: null,
  uploadDocument: true
};

export const mockFormattedEnglishProf: IEnglishProficiency = {
  id: mockApplicantInfo.appId,
  eliOption: mockEnglishProf.EliOption as EEliOption,
  test: {
    name: mockEnglishProf.TestName,
    score: mockEnglishProf.TestScore,
    date: mockEnglishProf.TestDate,
    country: mockEnglishProf.TestCountry
  },
  partner: {
    name: mockEnglishProf.PartnerName,
    dateCompletion: mockEnglishProf.PartnerDateCompletion
  },
  uploadDocument: mockEnglishProf.uploadDocument
};

export const mockEnglishProfPartnership = {
  id: mockApplicantInfo.appId,
  eliOption: '3' as EEliOption,
  test: {
    name: null,
    score: null,
    date: null,
    country: null
  },
  partner: {
    name: 'test partner',
    dateCompletion: new Date('2018-06-12T00:00:00.000Z')
  },
  uploadDocument: true
};

export const mockLanguage = {
  code: 'AF',
  name: 'Afrikaans',
  desc: 'Afrikaans'
};

export const mockCountry = { code: 'ALB', name: 'Albania' };

export const mockUser = {
  oid: '09wio3u13089123u812385',
  name: 'Test',
  emails: ['test@test.com'],
  tfp: 'B2C_1_signupsignin',
  agentId: null,
  given_name: null,
  city: null,
  aud: null,
  auth_time: null,
  exp: null,
  iat: null,
  iss: null,
  nbf: null,
  nonce: null,
  sub: null,
  ver: null
};

export const mockInfoRelease = {
  title: 'Ms',
  firstName: 'Test',
  lastName: 'Test',
  address: 'test street',
  address2: 'test street',
  city: 'test city',
  zipCode: 'M43T23',
  country: 'ALB',
  state: null,
  phone: { number: '21332113', countryCode: '321' },
  cellPhone: { number: '12123321321', countryCode: '123' },
  email: 'test@test.com',
  relationship: 'brother'
};

export const mockFormattedInfoRelease = {
  id: mockApplicantInfo.appId,
  info: mockInfoRelease
};

export const mockAgentApplications = [
  {
    appId: '57000010001',
    firstName: 'test',
    lastName: 'test',
    status: 'paid'
  },
  {
    appId: '57000010018',
    firstName: 'tesa',
    lastName: 'test',
    status: 'paid'
  },
  {
    appId: '57000010020',
    firstName: 'Test',
    lastName: 'Tester',
    status: 'paid'
  }
];

export const mockProgramListLoadParam: IProgramListReqParamPayload = {
  id: '0',
  year: 2021,
  month: 9,
  visa: mockApplicantInfo.countryOA
};
