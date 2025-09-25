import React from 'react';
import { Formik, Form } from 'formik';
import { BuildFormInputs, BuildFormSchema, BuildFormState } from './config';
import { Stack } from '@mui/material';
import { FormServizioDimaico } from './mockServiziDinamici';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Controls from './Controls';

import 'dayjs/locale/it';
import StaticFormSection from './StaticFormSection';

type DinamicFormProps = FormServizioDimaico

const DinamicForm = ({ fieldBeans, campoTotaleInclusoInXSD }: DinamicFormProps) => {

  const hasImporto = fieldBeans.some(field => field.name === 'importo') || Boolean(campoTotaleInclusoInXSD);
  const fields = BuildFormInputs(fieldBeans, !hasImporto);
  const schema = BuildFormSchema(fieldBeans);

  const validate = (values) => {
    const errors = {};
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => errors[issue.path[0]] = issue.message)
    }
    return errors;
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <Formik
          onSubmit={console.log}
          initialValues={BuildFormState(fieldBeans)}
          validate={validate}>
            {
              ({values}) => {
                console.log(values);
                return <Form>
                  <Stack gap={2}>
                    {fields}
                  </Stack>
                  <StaticFormSection />
                  <Controls />
                </Form>
              }
            }
        </Formik>
      </LocalizationProvider>
    </>
  )
}  

export default DinamicForm
