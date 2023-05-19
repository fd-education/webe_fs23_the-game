import {User} from '../types/user';

class UserRepository {
    private USER_KEY = 'user';
    private USER_ID_KEY = 'user_id';

    setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    removeUser(): void {
        localStorage.removeItem(this.USER_KEY);
    }

    setUserId(userId: string): void {
        localStorage.setItem(this.USER_ID_KEY, userId);
    }

    getUserId(): string | null {
        return localStorage.getItem(this.USER_ID_KEY);
    }

    removeUserId(): void {
        localStorage.removeItem(this.USER_ID_KEY);
    }
}

export default new UserRepository();
