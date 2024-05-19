import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { authSlice } from '../../store/authSlice';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { Button } from '~/ui/Button';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Input } from '~/ui/Input';
import { Form } from '~/ui/Form';
import { FormField } from '~/ui/FormField';
import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { Spinner } from '~/ui/Spinner';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { FormTitle } from '~/ui/FormTitle';

interface InitialValues {
  username: string;
  password: string;
}

const initialValues: InitialValues = {
  username: 'user8',
  password: 'password',
};

const VALIDATION_IS_EMPTY_MSG = 'required';
const VALIDATION_PASSWORD_MUST_MIN =
  'Password must contain at least 8 characters';

const validationSchema: yup.ObjectSchema<InitialValues> = yup.object({
  username: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  password: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .min(8, VALIDATION_PASSWORD_MUST_MIN),
});

export function LoginPage() {
  const dispatch = useAppDispatch();
  useAuthRedirect();
  const formik = useFormik<InitialValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        authSlice.thunks.loginThunk({
          loginPayload: values,
        }),
      );
    },
  });

  useEffect(
    () => () => {
      dispatch(authSlice.actions.loginRequestClear());
    },
    [],
  );

  const loginRequest = useAppSelector((state) => state.auth.loginRequest);

  const usernameFieldData = getFormikFieldData(formik, 'username');
  const passwordFieldData = getFormikFieldData(formik, 'password');

  return (
    <>
      <Spinner isShow={loginRequest.isLoading} />
      <AuthLayout>
        <Form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'}>
          <FormTitle>SIGN IN</FormTitle>
          {loginRequest.error && (
            <FormResponseErrors
              responseErrors={loginRequest.error}
              title={'Login request failed'}
            />
          )}
          <FormField title={'username'} error={usernameFieldData.errorText}>
            <Input
              {...usernameFieldData.fieldProps}
              placeholder={'mail...'}
              isError={usernameFieldData.isError}
              disabled={loginRequest.isLoading}
            />
          </FormField>
          <FormField title={'Password'} error={passwordFieldData.errorText}>
            <Input
              {...passwordFieldData.fieldProps}
              placeholder={'password...'}
              isError={passwordFieldData.isError}
              type={'password'}
              disabled={loginRequest.isLoading}
            />
          </FormField>
          <Button type={'submit'} disabled={loginRequest.isLoading}>
            Submit
          </Button>
        </Form>
      </AuthLayout>
    </>
  );
}
