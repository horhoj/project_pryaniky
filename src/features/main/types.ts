import { FetchUserdocsResponseDataItem } from '~/api/userdocs.types';

export type Userdoc = Pick<
  FetchUserdocsResponseDataItem,
  | 'companySigDate'
  | 'companySignatureName'
  | 'documentName'
  | 'documentStatus'
  | 'documentType'
  | 'employeeNumber'
  | 'employeeSigDate'
  | 'employeeSignatureName'
>;
