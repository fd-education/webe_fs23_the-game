import {User} from '@the-game/common/dist/types/auth/user';
import {atom} from 'recoil';

const localStorageEffect =
    (key: string) =>
    ({setSelf, onSet}) => {
        const user = localStorage.getItem(key);
        if (user != null) {
            setSelf(JSON.parse(user) as User);
        }

        onSet((newValue: User, _: any, isReset: boolean) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

const userState = atom<User | null>({
    key: 'userState',
    default: null,
    effects: [localStorageEffect('user')]
});

export default userState;
