import {GameStats} from './gameStats';
import {RegistrationPayload} from './registrationPayload';

export type User = {uid: string; gameStats?: GameStats} & Omit<
    RegistrationPayload,
    'password'
>;
