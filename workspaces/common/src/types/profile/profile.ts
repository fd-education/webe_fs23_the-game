import {Lang} from '../../enum/preferences/lang.enum';
import {Theme} from '../../enum/preferences/theme.enum';
import {UserGameStats} from './gameStats';

export type User = {
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