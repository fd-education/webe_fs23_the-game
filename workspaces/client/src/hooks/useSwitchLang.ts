import i18n from 'i18next';
import React, {useEffect, useState} from 'react';

export default function useSwitchLang(): [string, React.Dispatch<string>] {
    const [lang, setLang] = useState(localStorage.lang);
    const displayLang = lang === 'en' ? 'de' : 'en';

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        i18n.changeLanguage(displayLang);
        localStorage.setItem('lang', lang);
    }, [lang, displayLang]);

    return [displayLang, setLang];
}
