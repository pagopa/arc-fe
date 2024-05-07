import style from './style';
import config from './config';
import hooks from './hooks';
import converters from './converters';
import { Api } from '../../generated/apiClient';

export default {
  style,
  config,
  hooks,
  //** data transformers utility and formatters */
  converters,
  apiClient: new Api({ baseURL: config.baseURL })
};
