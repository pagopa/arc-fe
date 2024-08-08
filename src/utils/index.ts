import { Api } from '../../generated/apiClient';
import { Carts } from '../../generated/checkout/Carts';
import * as checkoutSchema from '../../generated/checkout/zod-schema';
import * as zodSchema from '../../generated/zod-schema';
import config from './config';
import converters from './converters';
import { datetools } from './datetools';
import hooks from './hooks';
import loaders from './loaders';
import modal from './modal';
import sidemenu from './sidemenu';
import storage from './storage';
import style from './style';

export default {
  // TO DO: timeout as env variable?
  apiClient: new Api({ baseURL: config.baseURL, timeout: 5000 }),
  cartsClient: new Carts(),
  //** data transformers utility and formatters */
  converters,
  checkoutSchema,
  config,
  datetools,
  hooks,
  loaders,
  modal,
  sidemenu,
  storage,
  style,
  zodSchema
};
