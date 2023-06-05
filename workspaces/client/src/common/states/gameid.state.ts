import {atom} from 'recoil';

const gameidState = atom<string>({
    key: 'gameidState',
    default: ''
});

export default gameidState;
