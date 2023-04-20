import {Lang} from '../enum/lang.enum';
import {Theme} from '../enum/theme.enum';

export type RegistrationPayload = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    language: Lang;
    theme: Theme;
};
