import { ServizioDinamico } from '../steps/Servizio';
import Easy from './easy.json';
import Medium from './medium.json';
import Hard from './hard.json';

export type FieldBean = {
  name: string;
  required: boolean;
  htmlRender:
    | 'NONE'
    | 'TEXT'
    | 'DATE'
    | 'TAB'
    | 'CURRENCY_LABEL'
    | 'SINGLESELECT'
    | 'MULTISELECT'
    | 'MULTIFIELD'
    | 'CURRENCY';
  regex?: string;
  htmlClass: string;
  htmlLabel?: string;
  htmlPlaceholder?: string;
  /** ???? */
  bindCms?: string;
  defaultValue?: string;
  /** ???? */
  insertableOrder: number;
  /** ???? */
  indexable: boolean;
  /** ???? */
  renderableOrder: number;
  /** ???? */
  searchableOrder: number;
  /** ???? */
  listableOrder: number;
  /** ???? */
  minOccurences: number;
  /** ???? */
  maxOccurences: number;
  /** ???? */
  groupBy?: string;
  extraAttr?: {
    error_message?: string;
    help_message?: string;
    validation_type?: string;
    dateFormat?: string;
    /** ??? */
    join_template_visual?: string;
    /** la stringa ha lo schema di un template literal e rappresenta il value
     * dell'input determinato dinamicamente
     */
    join_template?: string;
    /** ??? */
    total_included?: string;
    val_min?: string;
    val_max?: string;
    /** ??? */
    causale_function?: string;
    /** ??? */
    causale_visualizzata_function?: string;
    /** ??? */
    causale_function_uids?: string;
    /** ??? */
    causale_visualizzata_function_uids?: string;
    /** ??? */
    tab_description?: string;
  };
  /** ???? */
  associationField?: string;
  enumerationList?: Array<string>;
  /** ???? */
  validDependsOn?: string;
  /** ???? */
  validDependsOnUids?: string;
  /** ???? */
  valueDependsOn?: string;
  /** ???? */
  valueDependsOnUids?: string;
  /** ???? */
  hiddenDependsOn?: string;
  /** ???? */
  hiddenDependsOnUids?: string;
  /** ???? */
  mandatoryDependsOn?: string;
  /** ???? */
  mandatoryDependsOnUids?: string;
  /** ???? */
  enabledDependsOn?: string;
  /** ???? */
  enabledDependsOnUids?: string;
  /** ???? */
  errorMessage?: string;
  /** ???? */
  helpMessage?: string;
  /** ???? */
  insertable: boolean;
  /** ???? */
  renderable: boolean;
  /** ???? */
  listable: boolean;
  /** ???? */
  detailLink: boolean;
  /** ???? */
  association: boolean;
  /** ???? */
  searchable: boolean;
  subfields?: FieldBean[];
};

export type FormServizioDimaico = {
  fieldBeans: FieldBean[];
  campoTotaleInclusoInXSD?: string;
};

const mockServiziDinamiciForm: Record<ServizioDinamico, FormServizioDimaico> = {
  'Documento da pagare': Easy as FormServizioDimaico,
  'Servizi alla persona e servizi sociali': Medium as FormServizioDimaico,
  Arisgam: Hard as FormServizioDimaico
};

export default mockServiziDinamiciForm;
