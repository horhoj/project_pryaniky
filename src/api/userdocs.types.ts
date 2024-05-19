export interface FetchUserdocsResponse {
  error_code: number;
  error_message: string;
  data: FetchUserdocsResponseDataItem[];
  profiling: string;
  timings: null;
}

export interface FetchUserdocsResponseDataItem {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
}
