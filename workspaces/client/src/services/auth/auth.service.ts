import {PasswordResetTokenPayload} from '@the-game/common/dist/types/auth/passwordResetTokenPayload';
import {RegistrationPayload} from '@the-game/common/dist/types/auth/registrationPayload';
import {ResetPasswordPayload} from '@the-game/common/dist/types/auth/resetPasswordPayload';
import {SignInPayload} from '@the-game/common/dist/types/auth/signInPayload';
import {User} from '@the-game/common/dist/types/auth/user';
import {AxiosResponse} from 'axios';
import TokenRepository from '../../common/localstorage/token.repository';
import UserRepository from '../../common/localstorage/user.repository';
import authInterceptor from '../api';

class AuthService {
    async login(
        loginPayload: SignInPayload
    ): Promise<[User | null, string | null]> {
        const userResponse = await authInterceptor.post(
            '/auth/signin',
            loginPayload
        );

        if (userResponse.data.accessToken && userResponse.data.user) {
            TokenRepository.setAccessToken(userResponse.data.accessToken);
            TokenRepository.setRefreshToken(userResponse.data.refreshToken);
            UserRepository.setUserId(userResponse.data.user.uid);

            return [
                userResponse.data.user as User,
                userResponse.data.accessToken as string
            ];
        }

        return [null, null];
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

    requestResetPasswordToken(requestTokenPayload: PasswordResetTokenPayload) {
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
