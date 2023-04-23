import {RegistrationPayload} from '../../common/types/registrationPayload';
import {LoginPayload} from '../../common/types/loginPayload';
import {RequestTokenPayload} from '../../common/types/requestTokenPayload';
import {ResetPasswordPayload} from '../../common/types/resetPasswordPayload';
import {User} from '../../common/types/user';
import authInterceptor from '../api';
import TokenService from './token.service';

class AuthService {
    login(loginPayload: LoginPayload) {
        return authInterceptor
            .post('/auth/signin', loginPayload)
            .then((response) => {
                if (response.data.accessToken) {
                    TokenService.setAccessToken(response.data.accessToken);
                    TokenService.setRefreshToken(response.data.refreshToken);
                    localStorage.setItem('user_id', response.data.uid);
                }
                return response.data;
            });
    }

    logout(uid: string) {
        return authInterceptor.post('/auth/signout', {uid});
    }

    register(registrationPayload: RegistrationPayload) {
        return authInterceptor.post('/auth/register', registrationPayload);
    }

    requestResetPasswordToken(requestTokenPayload: RequestTokenPayload) {
        return authInterceptor.post('/auth/request-token', requestTokenPayload);
    }

    resetPassword(resetPasswordPayload: ResetPasswordPayload): Promise<void> {
        return authInterceptor.post(
            '/auth/reset-password',
            resetPasswordPayload
        );
    }

    getCurrentUser(): User | null {
        const user = localStorage.getItem('user');
        if (user) return JSON.parse(user);

        return null;
    }
}

export default new AuthService();
