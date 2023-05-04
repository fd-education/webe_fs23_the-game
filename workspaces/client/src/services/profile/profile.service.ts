import {ProfileUpdate} from '@the-game/common/dist/types/profileUpdate';
import {AxiosResponse} from 'axios';
import {User} from '../../common/types/user';
import authInterceptor from '../api';

class ProfileService {
    getProfile(uid: string): Promise<AxiosResponse<User>> {
        return authInterceptor.get('/profile', {
            params: {
                uid: uid
            }
        });
    }

    updateProfile(profileData: ProfileUpdate): Promise<AxiosResponse<User>> {
        return authInterceptor.patch('/profile', profileData);
    }
}

export default new ProfileService();
