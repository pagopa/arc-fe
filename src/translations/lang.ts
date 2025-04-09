import translationIT from './it/translations.json';
import translationEN from './en/translations.json';

const lang = {
  it: {
    label: 'Italiano',
    lang: 'it-IT',
    translation: translationIT
  },
  en: {
    label: 'English',
    lang: 'en-EN',
    translation: translationEN
  }
};
/* Are we sure we need a sorting function? The order wouldn't be the one commonly intended by us (which is usually: IT, EN, FR...)*/
export default lang;
