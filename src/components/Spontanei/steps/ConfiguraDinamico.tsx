import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServizioDinamico } from './Servizio';
import mockServiziDinamiciForm, { FieldBean } from '../mockServiziDinamici';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';

import * as z from 'zod';
import * as dayjs from 'dayjs';

type FieldName = FieldBean['name'];

let schema;

const ConfiguraPagamentoDinamico = (props: { servizio: ServizioDinamico }) => {
  const { t } = useTranslation();
  const { servizio } = props;

  const [formState, setFormaState] = useState<Record<FieldName, string>>({});
  const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>([]);

  const JSONform = mockServiziDinamiciForm[servizio];

  /** Render the whole form */
  const BuildForm = (elements: Array<FieldBean>) => elements.map((element) => BuildInput(element));

  const onChange = (field: FieldName, value: string) => {
    setFormaState({ ...formState, [field]: value });
  };

  /** set the form state considering the initial value */
  const BuildFormState = (fields: Array<FieldBean>) => {
    const intialState = fields.reduce(
      (accumulator, { name, defaultValue }) => ({ ...accumulator, [name]: defaultValue }),
      {}
    );
    setFormaState(intialState);
  };

  /** set the form state considering the initial value */
  const BuildFormSchema = (fields: Array<FieldBean>) => {
    let schemaObject = {};
    fields.forEach((field) => {
      const name = field.name;
      //const isRequired = field.required;
      const regex = field.regex;
      //const type = 'string';
      const errorMessage = field.extraAttr?.error_message;

      const simple = z.string();
      const withRex = simple.regex(new RegExp(regex || ''), errorMessage);

      schemaObject = { ...schemaObject, [name]: regex ? withRex : simple };
      //return `${name}: z.${type}()${!isRequired ? '.optional()' : ''}${regex ? `.regex('${regex}')` : ''}`;
    });
    console.log(schemaObject);

    schema = z.object(schemaObject);
  };

  useEffect(() => {
    BuildFormState(JSONform.fieldBeans);
    BuildFormSchema(JSONform.fieldBeans);
  }, []);

  /** return a bolean if the input has an error based on zod issues */
  const inputHasError = (issues: z.ZodIssue[], fieldName: string) =>
    issues.filter((error) => error.path.includes(fieldName)).length > 0;

  /** return the error message for an input based on zod issues and its name */
  const getErrorMessage = (issues: z.ZodIssue[], fieldName: string) =>
    issues
      .filter((error) => error.path.includes(fieldName))
      .map(({ message }) => message)
      .toString();

  /** Render a single input */
  const BuildInput = (input: FieldBean) => {
    const fieldName = input.name;
    const label = input.htmlLabel;
    const format = input.extraAttr?.dateFormat;
    switch (input.htmlRender) {
      case 'DATE':
        return (
          <>
            <DatePicker
              label={label}
              format={format}
              slotProps={{
                textField: {
                  error: inputHasError(zodIssues, fieldName),
                  helperText: getErrorMessage(zodIssues, fieldName)
                }
              }}
              value={formState[fieldName] ? dayjs(formState[fieldName]) : undefined}
              onChange={(value) => {
                onChange(fieldName, value?.format(format));
              }}
            />
          </>
        );
      case 'NONE':
        return null;
      case 'TEXT':
        return (
          <>
            <TextField
              label={input.htmlLabel}
              variant="outlined"
              value={formState[fieldName]}
              name={fieldName}
              error={inputHasError(zodIssues, fieldName)}
              onChange={(e) => onChange(fieldName, e.currentTarget.value)}
              helperText={getErrorMessage(zodIssues, fieldName)}
            />
          </>
        );
      default:
        return null;
    }
  };

  const submit = () => {
    const result = (schema as z.ZodObject<any>).safeParse(formState);
    if (result.success) {
      setZodIssues([]);
    } else {
      setZodIssues(result.error.issues);
    }
    console.log(result);
  };

  console.log(formState);
  return (
    <Card variant="outlined">
      <Stack spacing={2} padding={4}>
        <Typography variant="h6">{t('spontanei.form.steps.step3.title')}</Typography>
        <Typography>{t('spontanei.form.steps.step3.description')}</Typography>
        <Stack direction="column" justifyContent={'space-between'} spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
            {BuildForm(JSONform.fieldBeans)}
          </LocalizationProvider>
        </Stack>
        <Button onClick={submit}>submit</Button>
      </Stack>
    </Card>
  );
};

export default ConfiguraPagamentoDinamico;
