import { initReactI18next } from 'react-i18next';
import i18n from 'translations/i18n';

export const i18nTestSetup = (langmap: object) => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          ...langmap
        }
      }
    }
  });
};
