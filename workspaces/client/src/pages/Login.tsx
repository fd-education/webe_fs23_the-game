import {useTranslation} from 'react-i18next';
import {useSetRecoilState} from 'recoil';
import userState from '../common/states/user.state';
import {loginValidationSchema} from '../services/validation/login.validation';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {FloatingLabelInput} from '../components/util/input/FloatingLabelInput';
import {Form, Formik} from 'formik';
import React, {FC, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LoginPayload} from '../common/types/loginPayload';
import AuthService from '../services/auth/auth.service';
import {BigTitle} from '../components/util/title/BigTitle';

export const Login: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const setUser = useSetRecoilState(userState);

    const loginCallback = useCallback(async (loginPayload: LoginPayload) => {
        const user = await AuthService.login(loginPayload);

        if (!user) {
            setMessage('Invalid credentials');
            return;
        }

        setUser(user);
        navigate('/lobby');
    }, []);

    const initialValues: LoginPayload = {
        email: '',
        password: ''
    };

    const handleLogin = (formValue: LoginPayload) => {
        setMessage('');
        setLoading(true);

        loginCallback(formValue).catch(console.error);
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
