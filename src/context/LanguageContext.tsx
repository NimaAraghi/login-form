import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Direction, Language } from "../types/language";
import i18next from "i18next";

export type LanguageContextType = {
  language: string;
  changeLanguage: (language: Language) => void;
  dir: Direction;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("lang") as Language) || "fa"
  );
  const dir: Direction = language === "en" ? "ltr" : "rtl";

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18next.changeLanguage(lang);
  };

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <LanguageContext.Provider value={{ language, dir, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
};
