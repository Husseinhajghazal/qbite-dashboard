import { languages } from "@/types/Languages";
import { TranslatedProp, Translation } from "@/types/Store";

export const addTranslation = (
  body: Record<string, any>,
  key: string,
  newValue: any,
  oldValue: TranslatedProp | null,
  language: "ar" | "en"
) => {
  const languageIdToFind = languages[language];
  if (oldValue == null) {
    oldValue = {
      fallback: newValue,
      languageId: languageIdToFind,
      translations: [],
    };
  } else if (oldValue.languageId == languageIdToFind) {
    oldValue = { ...oldValue, fallback: newValue };
  } else {
    const { translations } = oldValue;
    const foundTranslation = findTranslation(translations, languageIdToFind);
    if (foundTranslation) {
      updateTranslation(foundTranslation, newValue);
    } else {
      const newTranslation = createTranslation(languageIdToFind, newValue);
      translations.push(newTranslation);
    }
  }
  body[key] = oldValue;
};

const findTranslation = (
  translations: Translation[],
  languageIdToFind: number
) => {
  return translations.find(
    (translation) => translation.languageId === languageIdToFind
  );
};

const updateTranslation = (translation: Translation, newValue: any) => {
  translation.text = newValue;
};

const createTranslation = (languageId: number, text: any) => {
  return {
    id: 0,
    languageId,
    text,
  };
};
