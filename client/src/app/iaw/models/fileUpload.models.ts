export class FieldIndex {
  groupIndex: number;
  rowIndex: number;
}

export class FileRow {
  showDelete: boolean;
  type: string;
  docId: string;
  fieldId: string;
  fileInput: string;
  fileName: string;
  file: File;
  rowLabels: string[];
  required: boolean;
  saved: boolean;
}

export enum EdocIds {
  PASSPORT = 'passport',
  STUDYPERMIT = 'studyPermit',
  SECONDARY_TRANSCRIPT = 'secondaryTranscript',
  SECONDARY_DIPLOMA = 'secondaryDiploma',
  POST_SECONDARY_TRANSCRIPT = 'postSecTranscript',
  POST_SECONDARY_CERTIFICATION = 'postSecCert',
  ENGLISH_PROFICIENCY_PROOF = 'engProfProof',
  OTHER = 'other'
}

export enum EdocTypes {
  INTERNATIONAL_DOCUMENTS = 'International Docs',
  GRADUATION_DOCUMENTS = 'Graduation Documents',
  INTERNATIONAL_TRANSCRIPTS = 'International Transcripts and Evaluations',
  ENGLISH_TEST_SCORE = 'English Test Score',
  PASSPORT = 'Passport',
  VISA_STUDY_PERMIT = 'Visa/Study Permit ',
  PATHWAY_PARTNER_LETTER = 'PATHWAY_PARTNER_LETTER'
}

export class NGroupedRow {
  sectionId?: Number;
  uid?: string;
  groupTitle: string;
  rows: FileRow[];
}

export interface IDialogData {
  ok: string;
}

export interface IfileInStore {
  docId: string;
  type: string;
  fileName: string;
}

export interface IfilesInStore {
  id: string;
  files: IfileInStore[];
}

export interface IfinalUpload {
  file: FormData;
  fileInfo: string;
}

export interface IUploadResponseFile {
  filename: string;
  uploadStatus: string;
}

export interface IUploadResponse {
  files: IUploadResponseFile[];
}

export interface IAPIResponseFile {
  Document_Id: string;
  Document_Name: string;
  Document_Type: string;
}
