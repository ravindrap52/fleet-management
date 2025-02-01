import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en_translation from "/locales/en/translation.json?url";
import de_translation from "/locales/de/translation.json?url";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: {
        en_translation,
      },
      de: {
        de_translation,
      },
    },
  });

export default i18n;
