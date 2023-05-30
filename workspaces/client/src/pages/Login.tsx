import {SignInPayload} from '@the-game/common/dist/types/auth/signInPayload';
import {useTranslation} from 'react-i18next';
import {useSetRecoilState} from 'recoil';
import TokenRepository from '../common/localstorage/token.repository';
import UserRepository from '../common/localstorage/user.repository';
import accessTokenState from '../common/states/accessToken.state';
import userState from '../common/states/user.state';
import {loginValidationSchema} from '../services/validation/login.validation';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {FloatingLabelInput} from '../components/util/input/FloatingLabelInput';
import {Form, Formik} from 'formik';
import React, {FC, useCallback, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../services/auth/auth.service';
import {BigTitle} from '../components/util/title/BigTitle';

export const Login: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const setUser = useSetRecoilState(userState);
    const setAccessToken = useSetRecoilState(accessTokenState);

    useEffect(() => {
        UserRepository.removeUser();
        UserRepository.removeUserId();
        TokenRepository.removeTokens();
    }, []);

    const loginCallback = useCallback(async (signInPayload: SignInPayload) => {
        const [user, accessToken] = await AuthService.login(signInPayload);

        if (!user || !accessToken) {
            setMessage('Invalid credentials');
            return;
        }

        setAccessToken(accessToken);
        setUser(user);
        navigate('/lobby');
    }, []);

    const initialValues: SignInPayload = {
        email: '',
        password: ''
    };

    const handleLogin = (signInPayload: SignInPayload) => {
        setMessage('');
        setLoading(true);

        loginCallback(signInPayload).catch(console.error);
    };

    return (
        <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-between bg-primaryLight dark:bg-primaryDark bg-cards bg-fill bg-scroll bg-cards-background bg-no-repeat">
            <BigTitle />

            <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={loginValidationSchema}
            >
                {() => (
                    <Form className="flex flex-col space-y-5 w-1/5">
                        <div className="flex flex-col space-y-3">
                            <FloatingLabelInput
                                name={'email'}
                                type={'text'}
                                label={t('auth.common.email')}
                            />
                            <div>
                                <FloatingLabelInput
                                    name={'password'}
                                    type={'password'}
                                    label={t('auth.common.password')}
                                />
                                <Link
                                    className="text-sm text-the_game_purple"
                                    to={'/request-token'}
                                >
                                    {t('auth.login.forgotPassword')}
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button
                                className={`btn bg-the_game_purple border-none hover:bg-the_game_darkPurple text-white rounded-full ${
                                    loading && 'loading'
                                }`}
                                type="submit"
                            >
                                {(loading && t('auth.login.loggingIn')) ||
                                    t('auth.login.login')}
                            </button>
                            <Link
                                className="text-sm text-the_game_purple"
                                to={'/register'}
                            >
                                {t('auth.login.noAccount')}
                            </Link>
                        </div>

                        {message && (
                            <div>
                                <div role="alert">{message}</div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>

            <div className="flex flex-col items-center space-y-8">
                <RulesButton />

                <PreferenceToggles
                    togglesToDisplay={{screenMode: true, language: true}}
                />
            </div>
        </div>
    );
};
