import {User} from '../types/user';

class UserRepository {
    private USER_KEY = 'user';
    private USER_ID_KEY = 'user_id';

    setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    getUser(): User | null {
        const user = localStorage.getItem(this.USER_KEY);

        if (!user) return null;

        return user as unknown as User;
    }

    setUserId(userId: string): void {
        localStorage.setItem(this.USER_ID_KEY, userId);
    }

    getUserId(): string | null {
        return localStorage.getItem(this.USER_ID_KEY);
    }
}

export default new UserRepository();
