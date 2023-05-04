import {AxiosResponse} from 'axios';
import {User} from '../../common/types/user';
import authInterceptor from '../api';
import authHeader from '../auth/auth-header';

class ProfileService {
    getProfile(uid: string): Promise<AxiosResponse<User>> {
        return authInterceptor.get('/profile', {
            params: {
                uid: uid
            },
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        });
    }
}

export default new ProfileService();
