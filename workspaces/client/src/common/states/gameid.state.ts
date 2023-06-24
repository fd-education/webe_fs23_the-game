import {atom} from 'recoil';

const localStorageEffect =
    (key: string) =>
    ({setSelf, onSet}) => {
        const gameId = localStorage.getItem(key);

        if (gameId != null) {
            setSelf(gameId);
        }

        onSet((newValue: string, _: any, isReset: boolean) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, newValue);
        });
    };

const gameidState = atom<string>({
    key: 'gameidState',
    default: '',
    effects: [localStorageEffect('game_id')]
});

export default gameidState;
