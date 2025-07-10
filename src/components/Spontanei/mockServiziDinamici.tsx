import { ServizioDinamico } from './steps/Servizio';

export type FieldBean = {
  name: string;
  required: boolean;
  htmlRender: 'NONE' | 'TEXT' | 'DATE';
  regex?: string;
  htmlClass: string;
  htmlLabel?: string;
  htmlPlaceholder?: string;
  /** ???? */
  bindCms?: string;
  defaultValue: string;
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
    /** ???? */
    join_template?: string;
  };
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
};

export type FormServizioDimaico = {
  fieldBeans: FieldBean[];
};

const mockServiziDinamiciForm: Record<ServizioDinamico, FormServizioDimaico> = {
  'Documento da pagare': {
    fieldBeans: [
      {
        name: 'sys_send_mysearch',
        required: false,
        htmlRender: 'NONE',
        htmlClass: 'center',
        defaultValue: 'true',
        insertableOrder: 0,
        indexable: false,
        renderableOrder: 0,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 0,
        maxOccurences: 0,
        insertable: false,
        renderable: false,
        listable: false,
        detailLink: false,
        association: false,
        searchable: false
      },
      {
        name: 'sys_type',
        required: true,
        regex: '.*',
        htmlRender: 'NONE',
        htmlClass: 'center',
        htmlLabel: 'Tipo',
        htmlPlaceholder: '',
        bindCms: 'cm:name',
        defaultValue: '',
        insertableOrder: 0,
        indexable: true,
        renderableOrder: 0,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 1,
        maxOccurences: 0,
        groupBy: '',
        extraAttr: {
          join_template:
            '${numero_documento}#${causale_pagamento}#${data_documento}#${nome_cognome_rag_sociale}#${codice_fiscale}'
        },
        enumerationList: [],
        validDependsOn: '',
        validDependsOnUids: '',
        valueDependsOn: '',
        valueDependsOnUids: '',
        hiddenDependsOn: '',
        hiddenDependsOnUids: '',
        mandatoryDependsOn: '',
        mandatoryDependsOnUids: '',
        enabledDependsOn: '',
        enabledDependsOnUids: '',
        errorMessage: '',
        helpMessage: '',
        insertable: false,
        renderable: false,
        listable: false,
        detailLink: false,
        association: false,
        searchable: false
      },
      {
        name: 'numero_documento',
        required: true,
        regex: '^.{1,10}$',
        htmlRender: 'TEXT',
        htmlClass: 'center',
        htmlLabel: 'Numero documento',
        htmlPlaceholder: '',
        bindCms: 'cm:name',
        defaultValue: '',
        insertableOrder: 1,
        indexable: true,
        renderableOrder: 1,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 1,
        maxOccurences: 0,
        groupBy: '',
        extraAttr: {
          error_message: 'Il Numero documento inserito non è corretto',
          help_message: 'Specificare il numero del documento'
        },
        enumerationList: [],
        validDependsOn: '',
        validDependsOnUids: '',
        valueDependsOn: '',
        valueDependsOnUids: '',
        hiddenDependsOn: '',
        hiddenDependsOnUids: '',
        mandatoryDependsOn: '',
        mandatoryDependsOnUids: '',
        enabledDependsOn: '',
        enabledDependsOnUids: '',
        errorMessage: '',
        helpMessage: '',
        insertable: true,
        renderable: true,
        listable: false,
        detailLink: true,
        association: false,
        searchable: false
      },
      {
        name: 'data_documento',
        required: true,
        regex: '\\d\\d\\/\\d\\d\\/\\d{4}',
        htmlRender: 'DATE',
        htmlClass: 'center',
        htmlLabel: 'Data emissione documento',
        htmlPlaceholder: '',
        bindCms: 'cm:name',
        defaultValue: '',
        insertableOrder: 4,
        indexable: true,
        renderableOrder: 4,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 1,
        maxOccurences: 0,
        groupBy: '',
        extraAttr: {
          error_message: 'La data inserita non è corretta',
          validation_type: 'data',
          dateFormat: 'DD/MM/YYYY',
          help_message: 'Specificare data emissione documento'
        },
        enumerationList: [],
        validDependsOn: '',
        validDependsOnUids: '',
        valueDependsOn: '',
        valueDependsOnUids: '',
        hiddenDependsOn: '',
        hiddenDependsOnUids: '',
        mandatoryDependsOn: '',
        mandatoryDependsOnUids: '',
        enabledDependsOn: '',
        enabledDependsOnUids: '',
        errorMessage: '',
        helpMessage: '',
        insertable: true,
        renderable: true,
        listable: false,
        detailLink: true,
        association: false,
        searchable: false
      },
      {
        name: 'causale_pagamento',
        required: true,
        regex: '^.{1,50}$',
        htmlRender: 'TEXT',
        htmlClass: 'center',
        htmlLabel: 'Descrizione aggiuntiva pagamento',
        htmlPlaceholder: '',
        bindCms: 'cm:name',
        defaultValue: '',
        insertableOrder: 2,
        indexable: true,
        renderableOrder: 2,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 1,
        maxOccurences: 0,
        groupBy: '',
        extraAttr: {
          error_message: 'Il valore inserito non è corretto',
          help_message: 'Dati aggiuntivi di identificazione del pagamento'
        },
        enumerationList: [],
        validDependsOn: '',
        validDependsOnUids: '',
        valueDependsOn: '',
        valueDependsOnUids: '',
        hiddenDependsOn: '',
        hiddenDependsOnUids: '',
        mandatoryDependsOn: '',
        mandatoryDependsOnUids: '',
        enabledDependsOn: '',
        enabledDependsOnUids: '',
        errorMessage: '',
        helpMessage: '',
        insertable: true,
        renderable: true,
        listable: false,
        detailLink: true,
        association: false,
        searchable: false
      },
      {
        name: 'nome_cognome_rag_sociale',
        required: true,
        regex: '^.{1,50}$',
        htmlRender: 'TEXT',
        htmlClass: 'center',
        htmlLabel: 'Ragione sociale intestatario',
        htmlPlaceholder: '',
        bindCms: 'cm:name',
        defaultValue: '',
        insertableOrder: 5,
        indexable: true,
        renderableOrder: 5,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 1,
        maxOccurences: 0,
        groupBy: '',
        extraAttr: {
          error_message: 'Ragione sociale intestatario non è corretto',
          help_message: 'Specificare ragione sociale intestatario del documento'
        },
        enumerationList: [],
        validDependsOn: '',
        validDependsOnUids: '',
        valueDependsOn: '',
        valueDependsOnUids: '',
        hiddenDependsOn: '',
        hiddenDependsOnUids: '',
        mandatoryDependsOn: '',
        mandatoryDependsOnUids: '',
        enabledDependsOn: '',
        enabledDependsOnUids: '',
        errorMessage: '',
        helpMessage: '',
        insertable: true,
        renderable: true,
        listable: false,
        detailLink: true,
        association: false,
        searchable: false
      },
      {
        name: 'codice_fiscale',
        required: true,
        regex: '^.{1,16}$',
        htmlRender: 'TEXT',
        htmlClass: 'center',
        htmlLabel: 'CF/PIVA intestatario documento',
        htmlPlaceholder: '',
        bindCms: 'cm:name',
        defaultValue: '',
        insertableOrder: 3,
        indexable: true,
        renderableOrder: 3,
        searchableOrder: 0,
        listableOrder: 0,
        minOccurences: 1,
        maxOccurences: 0,
        groupBy: '',
        extraAttr: {
          error_message: 'Il CF o la PIVA inserito non è corretto',
          validation_type: 'id_univoco_FG',
          help_message: "Specificare il CF o la PIVA dell'intestatario del documento"
        },
        enumerationList: [],
        validDependsOn: '',
        validDependsOnUids: '',
        valueDependsOn: '',
        valueDependsOnUids: '',
        hiddenDependsOn: '',
        hiddenDependsOnUids: '',
        mandatoryDependsOn: '',
        mandatoryDependsOnUids: '',
        enabledDependsOn: '',
        enabledDependsOnUids: '',
        errorMessage: '',
        helpMessage: '',
        insertable: true,
        renderable: true,
        listable: false,
        detailLink: true,
        association: false,
        searchable: false
      }
    ]
  }
};

export default mockServiziDinamiciForm;
