// noinspection JSUnusedGlobalSymbols

export type Profile = {
    uid: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    language: string;
    theme: string;
    profile_picture?: string;
    friend_list?: string[];
}