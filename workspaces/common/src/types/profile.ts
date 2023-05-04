import {Lang} from '../enum/lang.enum';
import {Theme} from '../enum/theme.enum';
import {UserGameStats} from './gameStats';

export type Profile = {
    uid: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    language: Lang;
    theme: Theme;
    profile_picture: string;
    friend_list?: string[];
    game_stats?: UserGameStats;
}