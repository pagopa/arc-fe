import style from './style';
import config from './config';
import hooks from './hooks';
import { Api } from '../../generated/apiClient';

export default {
  style,
  config,
  hooks,
  apiClient: new Api({ baseURL: config.baseURL })
};
