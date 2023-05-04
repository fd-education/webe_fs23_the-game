import {Lang} from '@the-game/common/dist/enum/lang.enum';
import {Theme} from '@the-game/common/dist/enum/theme.enum';

class PreferenceService {
    private THEME_KEY = 'theme';
    private LANGUAGE_KEY = 'lang';
    setTheme(theme: Theme) {
        localStorage.setItem(this.THEME_KEY, theme);
    }

    getTheme(): Theme {
        const theme = localStorage.getItem(this.THEME_KEY) as Theme;

        if (theme) return theme;
        return Theme.default;
    }

    setLanguage(lang: Lang) {
        localStorage.setItem(this.LANGUAGE_KEY, lang);
    }

    getLanguage(): Lang {
        const lang = localStorage.getItem(this.LANGUAGE_KEY) as Lang;

        if (lang) return lang;
        return Lang.default;
    }
}

export default new PreferenceService();
