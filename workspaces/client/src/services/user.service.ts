import {config} from '@/common/config/config';
import authHeader from '@/services/auth-header';
import axios from 'axios';

const PROFILE_API = config.backendUrl + '/profile';

class ProfileService {
    getProfile(uid: string) {
        return axios.post(
            PROFILE_API + '/get-profile',
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
