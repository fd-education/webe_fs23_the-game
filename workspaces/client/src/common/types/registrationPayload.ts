import {Lang} from '@the-game/common/dist/enum/lang.enum';
import {Theme} from '@the-game/common/dist/enum/theme.enum';

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
