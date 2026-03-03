import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageToggle({ className = "" }) {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "am" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 ${className}`}
        >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
                {i18n.language === "en" ? "EN" : "አማ"}
            </span>
        </button>
    );
}
