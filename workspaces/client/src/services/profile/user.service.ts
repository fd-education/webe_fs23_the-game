import axios from 'axios';
import {config} from '../../common/config/config';
import authHeader from '../auth/auth-header';

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
