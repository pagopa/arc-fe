import * as z from 'zod';
import { FieldBean } from '../mockServiziDinamici';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

export type FieldName = FieldBean['name'];

export type FormState = Record<FieldName, string>;

export type ZodIssues = z.ZodIssue[];

type OnChange = (fieldName: FieldName, value: string) => void;

/** return a bolean if the input has an error based on zod issues */
export const inputHasError = (issues: z.ZodIssue[], fieldName: string) =>
  issues.filter((error) => error.path.includes(fieldName)).length > 0;

/** return the error message for an input based on zod issues and its name */
export const getErrorMessage = (issues: z.ZodIssue[], fieldName: string) =>
  issues
    .filter((error) => error.path.includes(fieldName))
    .map(({ message }) => message)
    .toString();

export const buildDinamicValue = (stringTemplate: string, templateVars) => {
  const normalizedTemplate = stringTemplate.replace(/\${/g, '${this.');
  return new Function('return `' + normalizedTemplate + '`;').call(templateVars);
};

/** set the form state considering the initial value */
export const BuildFormSchema = (fields: Array<FieldBean>) => {
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
  });
  return z.object(schemaObject);
};

/** set the form state considering the initial value */
export const BuildFormState = (fields: Array<FieldBean>) => {
  const intialState = fields.reduce(
    (accumulator, { name, defaultValue }) => ({ ...accumulator, [name]: defaultValue }),
    {}
  );
  return intialState;
};

/** Render a single input */
export const BuildInput = (
  input: FieldBean,
  formState: FormState,
  zodIssues: ZodIssues,
  onChange: OnChange
) => {
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
    case 'TEXT': {
      const hasJoinTemplate = input.extraAttr?.join_template;
      let value: string = '';
      if (hasJoinTemplate) {
        value = buildDinamicValue(hasJoinTemplate, formState);
      } else {
        value = formState[fieldName];
      }
      return (
        <>
          <TextField
            label={input.htmlLabel}
            variant="outlined"
            value={value}
            name={fieldName}
            error={inputHasError(zodIssues, fieldName)}
            onChange={(e) => onChange(fieldName, e.currentTarget.value)}
            helperText={getErrorMessage(zodIssues, fieldName)}
          />
        </>
      );
    }
    default:
      return null;
  }
};

/** Render the whole form */
export const BuildForm = (
  elements: Array<FieldBean>,
  formState: FormState,
  zodIssues: ZodIssues,
  onChange: OnChange
) => elements.map((element) => BuildInput(element, formState, zodIssues, onChange));
