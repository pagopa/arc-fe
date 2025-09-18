import * as z from 'zod';
import { FieldBean } from '../mockServiziDinamici';

import SINGLESELECT from './FieldBeans/SINGLESELECT';
import MULTISELECT from './FieldBeans/MULTISELECT';
import DATE from './FieldBeans/DATE'
import TEXT from './FieldBeans/TEXT';
import CURRENCYLABEL from './FieldBeans/CURRENCYLABEL';
import MULTIFIELD from './FieldBeans/MULTIFIELD';
import NONE from './FieldBeans/NONE';
import TAB from './FieldBeans/TAB';

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
    const isRequired = field.required;
    const regex = field.regex;
    //const type = 'string';
    const errorMessage = field.extraAttr?.error_message;
    const simple = isRequired ? z.string().min(1, errorMessage) : z.string();
    const withRex = simple.regex(new RegExp(regex || ''), errorMessage);

    schemaObject = { ...schemaObject, [name]: regex ? withRex : simple };
  });
  return z.object(schemaObject);
};

/** set the form state considering the initial value */
let intialState = {};
export const BuildFormState = (fields: Array<FieldBean>) => {
  fields.forEach(
    ({ name, defaultValue, subfields, htmlRender }) => {
      if (subfields) BuildFormState(subfields)
      /* I fields MULTFIELD sono solo contenitori di altri fields
      non hanno un value associato e per questo motivo non è
      necessario tenere tracciao dello stato
      probabilmente anche altri tipi di fields non necessitano
      di stato  */
      if (htmlRender !== 'MULTIFIELD') {
        intialState = { ...intialState, [name]: defaultValue }
      }
    }
  );
  return intialState;
};

/** Render a single input */
export const BuildInput = (
  input: FieldBeanPros['input'],
  formState: FieldBeanPros['formState'],
  zodIssues: FieldBeanPros['zodIssues'],
  onChange: FieldBeanPros['onChange']
) => {
  const props = { input, formState, zodIssues, onChange};
  switch (input.htmlRender) {
    case 'TAB': return <TAB { ...props }/>
    case 'SINGLESELECT': return <SINGLESELECT { ...props }/>
    case 'MULTISELECT': return <MULTISELECT { ...props }/>
    case 'DATE': return <DATE { ...props } />
    case 'NONE': return <NONE { ...props }/>
    case 'CURRENCY':
    case 'TEXT': return <TEXT { ...props } />
    case 'CURRENCY_LABEL': return <CURRENCYLABEL { ...props }/>
    case 'MULTIFIELD': return <MULTIFIELD { ...props }/>
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

export type FieldBeanPros = {
  input: FieldBean,
  formState: FormState,
  zodIssues: ZodIssues,
  onChange: OnChange
}
