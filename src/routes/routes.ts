import config from 'utils/config';
const deployPath = config.deployPath;

export const ArcRoutes = {
  DASHBOARD: `${deployPath}/`,
  TRANSACTION: `${deployPath}/ricevute/:id`,
  TRANSACTIONS: `${deployPath}/ricevute/`,
  PAYMENT_NOTICES: `${deployPath}/avvisi/`,
  PAYMENT_NOTICE_DETAIL: `${deployPath}/avvisi/:id/:paTaxCode`,
  USER: `${deployPath}/profilo`,
  COURTESY_PAGE: `${deployPath}/errore`,
  LOGIN: `${deployPath}/accesso`,
  ASSISTANCE: `${deployPath}/assistenza`,
  AUTH_CALLBACK: `${deployPath}/auth-callback`,
  PRIVACY_PAGE: `${deployPath}/privacy_page`,
  RESOURCES: `${deployPath}/resources`
};
