import {config} from '../common/config/config';
import axios from 'axios';
import {RegistrationPayload} from '../common/types/registrationPayload';
import {LoginPayload} from '../common/types/loginPayload';

const AUTH_API = config.backendUrl + '/auth';

class AuthService {
    login(loginPayload: LoginPayload) {
        console.log('loginPayload', loginPayload);

        return axios
            .post(AUTH_API + '/signin', loginPayload)
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        // TODO implement backend route for signout
        localStorage.removeItem('user');
    }

    register(registrationPayload: RegistrationPayload) {
        return axios.post(AUTH_API + '/register', registrationPayload);
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        if (user) return JSON.parse(user);

        return null;
    }
}

export default new AuthService();
