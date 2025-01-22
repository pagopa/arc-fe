import config from 'utils/config';
const deployPath = config.deployPath;

export const ArcRoutes = {
  DASHBOARD: `${deployPath}/`,
  TRANSACTION: `${deployPath}/ricevute/:id`,
  TRANSACTIONS: `${deployPath}/ricevute/`,
  PAYMENT_NOTICES: `${deployPath}/avvisi/`,
  PAYMENT_NOTICE_DETAIL: `${deployPath}/avvisi/:id/:paTaxCode`,
  USER: `${deployPath}/profilo`,
  COURTESY_PAGE: `${deployPath}/errore/:error`,
  LOGIN: `${deployPath}/accesso`,
  ASSISTANCE: `${deployPath}/assistenza`,
  AUTH_CALLBACK: `${deployPath}/auth-callback`,
  TOS: `${deployPath}/termini-di-servizio`,
  PRIVACY_POLICY: `${deployPath}/informativa-privacy`
};

export enum ArcErrors {
  'sessione-scaduta' = 401,
  /** whitelist: user not authorized to access the resource */
  'accesso-non-autorizzato' = 403,
  /** something went wrong with the login */
  'accesso-non-riuscito' = 408,
  'avviso-non-pagabile' = 422,
  'avvio-pagamento' = 423
}
