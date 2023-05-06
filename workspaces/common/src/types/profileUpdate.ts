export type ProfileUpdate = {
    uid: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    language?: string;
    theme?: string;
    profile_picture?: string;
}