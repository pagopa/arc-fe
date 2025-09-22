import React from 'react';
import * as z from 'zod';
import { FieldBean } from './mockServiziDinamici';

// SANDBOX
const sand = require('@nyariv/sandboxjs');
const Sandbox = sand.default;
const sandbox = new Sandbox();

// FIELDBEANS INPUTS
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


/** return a bolean if the input has an error based on zod issues */
export const inputHasError = (issues: z.ZodIssue[], fieldName: string) =>
  issues.filter((error) => error.path.includes(fieldName)).length > 0;

/** return the error message for an input based on zod issues and its name */
export const getErrorMessage = (issues: z.ZodIssue[], fieldName: string) =>
  issues
    .filter((error) => error.path.includes(fieldName))
    .map(({ message }) => message)
    .toString();

/** usata per la causale */    
export const buildDinamicValue = (stringTemplate: string, templateVars, fields?: FieldBean[]) => {
  const updatedFields = {};

  if(fields) {
    fields.forEach(field => {
      const name = field.name;
      const causaleFunction = field.extraAttr?.causale_function;
      const hasCausaleFunction = Boolean(causaleFunction);
      if (hasCausaleFunction) {
        updatedFields[name] = computeValue(causaleFunction, templateVars)
      }
    })
  }
  
  const normalizedTemplate = stringTemplate.replace(/\${/g, '${this.');
  return new Function('return `' + normalizedTemplate + '`;')
    .call({...templateVars, ...updatedFields});
};

export const computeValue = (code, scope = {}) => sandbox.compile(code)(scope).run();
/** set the form schema for validation */
let schemaObject = {};
export const BuildFormSchema = (fields: Array<FieldBean>) => {
  fields.forEach((field) => {
    if (field.subfields) BuildFormSchema(field.subfields)
    const name = field.name;
    const isRequired = field.required;
    const regex = field.regex;
    const type = field.htmlRender;
    const errorMessage = field.extraAttr?.error_message;

    let fieldSchema;
    if(type === 'MULTISELECT') {
      fieldSchema = isRequired ?
        z.array(z.string()).min(1, errorMessage) : 
        z.array(z.string())
    } else {
      fieldSchema = isRequired ? z.string().min(1, errorMessage) : z.string();
      if (regex) {
        fieldSchema = fieldSchema.regex(new RegExp(regex || ''), errorMessage);
      }
    }
    schemaObject = { ...schemaObject, [name] : fieldSchema };
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
        // Una multiselect usa un array di valori
        // TODO: gestire un eventuale valore
        // iniziale. In questo caso è più complesso
        // perchè defaultValue dovrebbe essere un array di valori
        if(htmlRender == 'MULTISELECT') {
          intialState = { ...intialState, [name]: [] }
        } else {
          intialState = { ...intialState, [name]: defaultValue }
        }
      }
    }
  );
  return intialState;
};

/** Render a single input */
export const BuildInput = (element: FieldBean, allElements?: FieldBean[]) => {
  switch (element.htmlRender) {
    case 'TAB': return <TAB input={element} />
    case 'SINGLESELECT': return <SINGLESELECT input={element}/>
    case 'MULTISELECT': return <MULTISELECT input={element}/>
    // case 'DATE': return <DATE  />
    case 'NONE': return <NONE input={element} allFields={allElements || []}/>
    case 'CURRENCY':
    case 'TEXT': return <TEXT input={element} />
    case 'CURRENCY_LABEL': return <CURRENCYLABEL input={element} />
    case 'MULTIFIELD': return <MULTIFIELD input={element} />
    default:
      return null;
  }
};

/** Render a group of inputs */
export const BuildFormInputs = (
  elements: Array<FieldBean>,
) => elements.sort((a, b) => a.renderableOrder - b.renderableOrder ).map((element) => BuildInput(element, elements));

export type FieldBeanPros = {
  input: FieldBean 
}
