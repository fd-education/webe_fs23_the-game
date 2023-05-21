import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import de from './locales/de.json';

// noinspection JSIgnoredPromiseFromCall
i18n.use(initReactI18next).init({
    resources: {
        en,
        de
    },
    lng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
