import axios, {AxiosInstance} from 'axios';
import {config} from '../common/config/config';
import TokenService from '../common/localstorage/token.repository';

const authInterceptor: AxiosInstance = axios.create({
    baseURL: config.backendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

authInterceptor.interceptors.request.use(
    (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: Error) => {
        return Promise.reject(error);
    }
);

authInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;

        if (originalConfig.url !== '/auth/signin' && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    await refreshAccessToken();

                    return authInterceptor(originalConfig);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);

export const refreshAccessToken = async () => {
    const BASE_URL = config.backendUrl;

    const resp = await axios.post(
        BASE_URL + '/auth/refresh',
        {
            uid: localStorage.getItem('user_id'),
            refreshToken: TokenService.getRefreshToken()
        },
        {
            headers: {
                Authorization: `Bearer ${TokenService.getRefreshToken()}`
            }
        }
    );

    const {accessToken} = resp.data;
    TokenService.setAccessToken(accessToken);
};

export default authInterceptor;
