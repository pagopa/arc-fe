import { useState } from 'react';
import { LangCode } from '@pagopa/mui-italia';
import i18n from '../translations/i18n';

export const useLanguage = () => {
  const [language, setLanguage] = useState<LangCode>(i18n.language as LangCode);

  const changeLanguage = (langCode: LangCode) => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
  };
  return { language, changeLanguage };
};
