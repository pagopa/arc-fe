import React from 'react';
import { Formik, Form } from 'formik';
import { BuildFormInputs, BuildFormSchema, BuildFormState } from './config';
import { Stack } from '@mui/material';
import { FieldBean } from './mockServiziDinamici';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Controls from './Controls';

import 'dayjs/locale/it';

type DinamicFormProps = {
  form: { fieldBeans: FieldBean[]; }
}

const DinamicForm = ({ form }: DinamicFormProps) => {
  const fields = BuildFormInputs(form.fieldBeans);
  const schema = BuildFormSchema(form.fieldBeans);

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
          initialValues={BuildFormState(form.fieldBeans)}
          validate={validate}>
            {
              (props) => {
                //console.log(props.values)
                return (
                  <Form>
                    <Stack gap={2}>
                      {fields}
                    </Stack>
                    <Controls
                      submit={props.submitForm}
                      reset={props.resetForm} />
                  </Form>
                )
              }
            }
        </Formik>
      </LocalizationProvider>
    </>
  )
}  

export default DinamicForm
