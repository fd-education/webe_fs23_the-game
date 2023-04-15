import {RegistrationPayload} from '@/common/types/registrationPayload';
import {GameStats} from '@/common/types/gameStats';

export type User = {uid: string; gameStats?: GameStats} & Omit<
    RegistrationPayload,
    'password'
>;
