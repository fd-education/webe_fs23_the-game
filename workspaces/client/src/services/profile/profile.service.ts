import authInterceptor from '../api';
import authHeader from '../auth/auth-header';

class ProfileService {
    getProfile(uid: string) {
        return authInterceptor.post(
            '/profile/get-profile',
            {
                uid
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader()
                }
            }
        );
    }
}

export default new ProfileService();
