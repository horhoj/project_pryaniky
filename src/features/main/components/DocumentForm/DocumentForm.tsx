import * as yup from 'yup';
import { useFormik } from 'formik';
import { Userdoc } from '../../types';
import { dateForInput, dateFromInput } from '../../helpers';
import { Form } from '~/ui/Form';
import { Spinner } from '~/ui/Spinner';
import { FormTitle } from '~/ui/FormTitle/FormTitle';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { FormField } from '~/ui/FormField';
import { Input } from '~/ui/Input';
import { Button } from '~/ui/Button';
import { ApiError } from '~/api/common.types';
import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { Flex } from '~/ui/Flex';

interface DocumentFormProps {
  isLoading: boolean;
  responseErrors: ApiError | null;
  initialValues: Userdoc;
  onSubmit: (values: Userdoc) => void;
  title: string;
}

const VALIDATION_IS_EMPTY_MSG = 'required';

const validationSchema = yup.object({
  documentName: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  companySigDate: yup.date().required(VALIDATION_IS_EMPTY_MSG),
  companySignatureName: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  documentStatus: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  documentType: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  employeeNumber: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  employeeSigDate: yup.date().required(VALIDATION_IS_EMPTY_MSG),
  employeeSignatureName: yup.string().required(VALIDATION_IS_EMPTY_MSG),
});

export function DocumentForm({
  isLoading,
  responseErrors,
  initialValues,
  onSubmit,
  title,
}: DocumentFormProps) {
  const formik = useFormik<Userdoc>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const docNameFD = getFormikFieldData(formik, 'documentName');
  const docStatusFD = getFormikFieldData(formik, 'documentStatus');
  const docTypeFD = getFormikFieldData(formik, 'documentType');
  const companySigFD = getFormikFieldData(formik, 'companySigDate');
  const companySigNameFD = getFormikFieldData(formik, 'companySignatureName');
  const employeeNumberFD = getFormikFieldData(formik, 'employeeNumber');
  const employeeSignatureNameFD = getFormikFieldData(
    formik,
    'employeeSignatureName',
  );
  const employeeSigDateFD = getFormikFieldData(formik, 'employeeSigDate');

  return (
    <>
      <Spinner isShow={isLoading} />

      <Form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'}>
        <FormTitle>{title}</FormTitle>
        {responseErrors && (
          <FormResponseErrors
            responseErrors={responseErrors}
            title={'Request failed'}
          />
        )}
        <Flex>
          <FormField title={'doc name'} error={docNameFD.errorText}>
            <Input
              {...docNameFD.fieldProps}
              placeholder={'...'}
              isError={docNameFD.isError}
              disabled={isLoading}
            />
          </FormField>

          <FormField title={'doc status'} error={docStatusFD.errorText}>
            <Input
              {...docStatusFD.fieldProps}
              placeholder={'...'}
              isError={docStatusFD.isError}
              disabled={isLoading}
            />
          </FormField>
        </Flex>

        <Flex>
          <FormField title={'doc type'} error={docTypeFD.errorText}>
            <Input
              {...docTypeFD.fieldProps}
              placeholder={'...'}
              isError={docTypeFD.isError}
              disabled={isLoading}
            />
          </FormField>

          <FormField
            title={'company sig name'}
            error={companySigNameFD.errorText}
          >
            <Input
              {...companySigNameFD.fieldProps}
              placeholder={'...'}
              isError={companySigNameFD.isError}
              disabled={isLoading}
            />
          </FormField>
        </Flex>

        <Flex>
          <FormField title={'company sign'} error={companySigFD.errorText}>
            <Input
              {...companySigFD.fieldProps}
              value={dateForInput(companySigFD.fieldProps.value)}
              onChange={(e) => {
                formik.setFieldValue(
                  'companySigDate',
                  dateFromInput(e.target.value),
                );
              }}
              placeholder={'...'}
              isError={companySigFD.isError}
              disabled={isLoading}
              type={'datetime-local'}
            />
          </FormField>

          <FormField
            title={'employee number'}
            error={employeeNumberFD.errorText}
          >
            <Input
              {...employeeNumberFD.fieldProps}
              placeholder={'...'}
              isError={employeeNumberFD.isError}
              disabled={isLoading}
            />
          </FormField>
        </Flex>
        <Flex>
          <FormField
            title={'employee signature name'}
            error={employeeSignatureNameFD.errorText}
          >
            <Input
              {...employeeSignatureNameFD.fieldProps}
              placeholder={'...'}
              isError={employeeSignatureNameFD.isError}
              disabled={isLoading}
            />
          </FormField>

          <FormField
            title={'employee sig date'}
            error={employeeSigDateFD.errorText}
          >
            <Input
              {...companySigFD.fieldProps}
              value={dateForInput(employeeSigDateFD.fieldProps.value)}
              onChange={(e) => {
                formik.setFieldValue(
                  'employeeSigDate',
                  dateFromInput(e.target.value),
                );
              }}
              placeholder={'...'}
              isError={employeeSigDateFD.isError}
              disabled={isLoading}
              type={'datetime-local'}
            />
          </FormField>
        </Flex>

        <Button type={'submit'} disabled={isLoading}>
          Submit
        </Button>
      </Form>
    </>
  );
}
