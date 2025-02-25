import { Api } from '../../generated/apiClient';
import { Carts } from '../../generated/checkout/Carts';
import * as checkoutSchema from '../../generated/checkout/zod-schema';
import * as zodSchema from '../../generated/zod-schema';
import config from './config';
import converters from './converters';
import { datetools } from './datetools';
import loaders from './loaders';
import modal from './modal';
import notify from './notify';
import sidemenu from './sidemenu';
import storage from './storage';
import style from './style';
import files from './files';

export default {
  apiClient: new Api({ baseURL: config.baseURL, timeout: config.apiTimeout }),
  cartsClient: new Carts({ baseURL: config.checkoutPlatformUrl, timeout: config.apiTimeout }),
  //** data transformers utility and formatters */
  converters,
  checkoutSchema,
  config,
  datetools,
  loaders,
  modal,
  notify,
  files,
  sidemenu,
  storage,
  style,
  zodSchema
};
