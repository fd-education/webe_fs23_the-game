import {Lang} from '@/common/enum/lang.enum';
import {Theme} from '@/common/enum/theme.enum';

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
