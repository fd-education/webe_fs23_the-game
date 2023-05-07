import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';

export type RegistrationPayload = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    language: Lang;
    theme: Theme;
};
