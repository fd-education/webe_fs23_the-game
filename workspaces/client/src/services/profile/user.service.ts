import {ProfileUpdate} from '@the-game/common/dist/types/profile/profileUpdate';
import {AxiosResponse} from 'axios';
import {User} from '../../common/types/user';
import authInterceptor from '../api';

class UserService {
    getUser(uid: string): Promise<AxiosResponse<User>> {
        return authInterceptor.get('/profile', {
            params: {
                uid: uid
            }
        });
    }

    updateUser(profileData: ProfileUpdate): Promise<AxiosResponse<User>> {
        return authInterceptor.patch('/profile', profileData);
    }

    deleteUser(uid: string): Promise<AxiosResponse<User>> {
        return authInterceptor.delete('/profile' + '/' + uid);
    }
}

export default new UserService();
