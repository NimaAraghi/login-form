import { useLang } from "../context/LanguageContext";
import type { Language } from "../types/language";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLang();

  return (
    <div dir='rtl' className='flex w-full justify-center gap-2 mb-6'>
      {(["fa", "en", "ar"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            language === lang
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {lang === "fa" ? "فارسی" : lang === "en" ? "English" : "العربية"}
        </button>
      ))}
    </div>
  );
}
