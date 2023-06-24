import {atom} from 'recoil';

const localStorageEffect =
    (key: string) =>
    ({setSelf, onSet}) => {
        const token = localStorage.getItem(key);

        if (token != null) {
            setSelf(token);
        }

        onSet((newValue: string, _: any, isReset: boolean) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, newValue);
        });
    };

const accessTokenState = atom<string | null>({
    key: 'accessTokenState',
    default: null,
    effects: [localStorageEffect('token')]
});

export default accessTokenState;
