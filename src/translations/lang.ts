import translationIT from './it/translations.json';
import translationEN from './en/translations.json';
import { Languages } from '@pagopa/mui-italia';

const lang: Languages & {
  it: { label: string; lang: string; translation: typeof translationIT };
  en: { label: string; lang: string; translation: typeof translationEN };
} = {
  it: {
    it: 'Italiano',
    en: 'Inglese',
    fr: 'Francese',
    label: 'Italiano',
    lang: 'it-IT',
    translation: translationIT
  },
  en: {
    it: 'Italian',
    en: 'English',
    fr: 'French',
    label: 'English',
    lang: 'en-US',
    translation: translationEN
  }
};
/* Are we sure we need a sorting function? The order wouldn't be the one commonly intended by us (which is usually: IT, EN, FR...)*/
export default lang;
