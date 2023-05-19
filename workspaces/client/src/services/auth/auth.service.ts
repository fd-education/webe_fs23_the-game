import {AxiosResponse} from 'axios';
import TokenRepository from '../../common/localstorage/token.repository';
import UserRepository from '../../common/localstorage/user.repository';
import {RegistrationPayload} from '../../common/types/registrationPayload';
import {LoginPayload} from '../../common/types/loginPayload';
import {RequestTokenPayload} from '../../common/types/requestTokenPayload';
import {ResetPasswordPayload} from '../../common/types/resetPasswordPayload';
import {User} from '../../common/types/user';
import authInterceptor from '../api';

class AuthService {
    async login(loginPayload: LoginPayload) {
        const userResponse = await authInterceptor.post(
            '/auth/signin',
            loginPayload
        );

        if (userResponse.data.accessToken) {
            TokenRepository.setAccessToken(userResponse.data.accessToken);
            TokenRepository.setRefreshToken(userResponse.data.refreshToken);
        }

        if (userResponse.data.user) {
            UserRepository.setUserId(userResponse.data.user.uid);

            return userResponse.data.user as User;
        }
    }

    async logout() {
        const uid = localStorage.getItem('user_id');

        if (uid)
            await authInterceptor.get('/auth/signout', {
                params: {
                    uid: uid
                }
            });

        UserRepository.removeUserId();
        UserRepository.removeUser();
        TokenRepository.removeTokens();
    }

    register(
        registrationPayload: RegistrationPayload
    ): Promise<AxiosResponse<void>> {
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
