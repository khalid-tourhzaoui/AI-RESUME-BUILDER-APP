import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            logout: "Logout",
            frensh: "Frensh",
            english: "English",
        },
    },
    fr: {
        translation: {
            welcome: "Bienvenue",
            logout: "Déconnexion",
            frensh: "Français",
            english:"Anglais"
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de secours
    interpolation: {
        escapeValue: false, // React gère déjà l'échappement
    },
});

export default i18n;
