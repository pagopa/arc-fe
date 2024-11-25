import translationIT from './it/translations.json';
import { Languages } from '@pagopa/mui-italia';

const lang: Languages & {
  it: { label: string; lang: string; translation: typeof translationIT };
} = {
  it: {
    it: 'Italiano',
    label: 'Italiano',
    lang: 'it-IT',
    translation: translationIT
  }
};
/* Are we sure we need a sorting function? The order wouldn't be the one commonly intended by us (which is usually: IT, EN, FR...)*/
export default lang;
