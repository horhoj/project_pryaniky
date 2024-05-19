import { Userdoc } from './types';
import { FetchUserdocsResponseDataItem } from '~/api/userdocs.types';

export const getUserdocForEdit = (
  rowId: string | null,
  rows: FetchUserdocsResponseDataItem[] | undefined,
): Userdoc | undefined => {
  if (rowId === null || rows === undefined) {
    return;
  }
  const row = rows.find((el) => el.id === rowId);
  if (row === undefined) {
    return;
  }
  const {
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
  } = row;

  return {
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
  };
};

export const dateForInput = (value: string) => {
  try {
    return new Date(value).toISOString().slice(0, 16);
  } catch {
    return '';
  }
};

export const dateFromInput = (value: string) => `${value}:00.000Z`;
