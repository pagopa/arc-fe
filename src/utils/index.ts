import style from './style';
import config from './config';
import hooks from './hooks';
import converters from './converters';
import { Api } from '../../generated/apiClient';
import loaders from './loaders';
import { datetools } from './datetools';
import * as zodSchema from '../../generated/zod-schema';
import storage from './storage';
import modal from './modal';

export default {
  style,
  config,
  hooks,
  //** data transformers utility and formatters */
  converters,
  // TO DO: timeout as env variable?
  apiClient: new Api({ baseURL: config.baseURL, timeout: 5000 }),
  loaders,
  zodSchema,
  datetools,
  storage,
  modal
};
