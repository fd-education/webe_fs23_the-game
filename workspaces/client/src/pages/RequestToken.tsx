import {AxiosError} from 'axios';
import {Form, Formik} from 'formik';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';
import {RequestTokenPayload} from '../common/types/requestTokenPayload';
import AuthService from '../services/auth/auth.service';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {FloatingLabelInput} from '../components/util/input/FloatingLabelInput';
import {BigTitle} from '../components/util/title/BigTitle';
import * as Yup from 'yup';

export const RequestToken: FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [message, setMessage] = React.useState('');

    const initialValues = {
        email: '',
        username: ''
    };

    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string()
                .email(t('auth.common.errors.invalidEmail').toString())
                .required(t('auth.common.errors.requiredEmail').toString()),
            username: Yup.string().required(
                t('auth.common.errors.requiredUsername').toString()
            )
        });
    };

    const handleSubmit = (values: RequestTokenPayload) => {
        setMessage('');

        AuthService.requestResetPasswordToken(values).then(
            () => {
                navigate('/reset-password');
            },
            (error: AxiosError) => {
                const resMessage =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage.toString());
            }
        );
    };

    const handleReset = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-between bg-primaryLight dark:bg-primaryDark bg-cards bg-fill bg-scroll bg-cards-background bg-no-repeat">
            <BigTitle />

            <div className="flex flex-col space-y-5 w-1/5">
                <p className="font-title  text-black dark:text-white text-center">
                    {t('auth.passwordReset.info')}
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <Form className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-3">
                            <FloatingLabelInput
                                name={'email'}
                                type={'text'}
                                label={t('auth.common.email')}
                            />
                            <div>
                                <FloatingLabelInput
                                    name={'username'}
                                    type={'username'}
                                    label={t('auth.common.username')}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button
                                className={
                                    'btn bg-the_game_purple border-none hover:bg-the_game_darkPurple text-white rounded-full'
                                }
                                type="submit"
                            >
                                {t('auth.passwordReset.getCode')}
                            </button>
                            <button
                                className={`btn bg-the_game_gray border-none hover:bg-gray-600 text-white rounded-full`}
                                type="reset"
                            >
                                {t('common.cancel')}
                            </button>
                            <Link
                                className="text-sm text-the_game_purple"
                                to={'/reset-password'}
                            >
                                {t('auth.passwordReset.codeExists')}
                            </Link>
                        </div>

                        {message && (
                            <div>
                                <div role="alert">{message}</div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>

            <PreferenceToggles
                togglesToDisplay={{screenMode: true, language: true}}
            />
        </div>
    );
};
