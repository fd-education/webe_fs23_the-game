import {useTranslation} from 'react-i18next';
import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {RulesButton} from '../util/button/RulesButton';
import {FloatingLabelInput} from '../util/input/FloatingLabelInput';
import {Form, Formik} from 'formik';
import {RegistrationPayload} from '../../common/types/registrationPayload';
import React, {FC} from 'react';
import * as Yup from 'yup';
import {Lang} from '../../common/enum/lang.enum';
import {Theme} from '../../common/enum/theme.enum';
import AuthService from '../../services/auth/auth.service';
import {useNavigate} from 'react-router-dom';
import {BigTitle} from '../util/title/BigTitle';

export const Register: FC = () => {
    const [successful, setSuccessful] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();
    const {t} = useTranslation();

    const initialValues: RegistrationPayload = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        language: Lang.DE,
        theme: Theme.light
    };

    const validationSchema = () => {
        const passwordInvalid = t(
            'auth.common.errors.invalidPassword'
        ).toString();
        const usernameInvalid = t(
            'auth.common.errors.invalidUsername'
        ).toString();

        return Yup.object().shape({
            firstname: Yup.string().required(
                t('auth.common.errors.requiredFirstname').toString()
            ),
            lastname: Yup.string().required(
                t('auth.common.errors.requiredLastname').toString()
            ),
            username: Yup.string()
                .min(5, usernameInvalid)
                .max(30, usernameInvalid)
                .required(t('auth.common.errors.requiredUsername').toString()),
            email: Yup.string()
                .email(t('auth.common.errors.invalidEmail').toString())
                .required(t('auth.common.errors.requiredEmail').toString()),
            password: Yup.string()
                .min(8, passwordInvalid)
                .matches(/[0-9]/, passwordInvalid)
                .matches(/[a-z]/, passwordInvalid)
                .matches(/[A-Z]/, passwordInvalid)
                .matches(/\W/, passwordInvalid)
                .required(t('auth.common.errors.requiredPassword').toString()),
            confirmPassword: Yup.string()
                .oneOf(
                    [Yup.ref('password')],
                    t('auth.common.errors.invalidConfirmPassword').toString()
                )
                .required(
                    t('auth.common.errors.requiredConfirmPassword').toString()
                )
        });
    };

    const handleRegister = (formValue: RegistrationPayload) => {
        AuthService.register(formValue).then(
            (response: any) => {
                setMessage(response.data.message);
                setSuccessful(true);
                navigate('/login');
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    const handleCancellation = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-between bg-primaryLight dark:bg-primaryDark bg-cards bg-fill bg-scroll bg-cards-background bg-no-repeat">
            <BigTitle />

            <Formik
                initialValues={initialValues}
                onSubmit={handleRegister}
                onReset={handleCancellation}
                validationSchema={validationSchema}
            >
                <Form className="flex flex-col space-y-5 w-1/5">
                    {!successful && (
                        <div className="flex flex-col space-y-8">
                            <div className="flex flex-col space-y-3">
                                <FloatingLabelInput
                                    name={'firstname'}
                                    type={'text'}
                                    label={t('auth.common.firstname')}
                                />
                                <FloatingLabelInput
                                    name={'lastname'}
                                    type={'text'}
                                    label={t('auth.common.lastname')}
                                />
                                <FloatingLabelInput
                                    name={'username'}
                                    type={'text'}
                                    label={t('auth.common.username')}
                                />
                                <FloatingLabelInput
                                    name={'email'}
                                    type={'text'}
                                    label={t('auth.common.email')}
                                />
                            </div>
                            <div className="flex flex-col space-y-3">
                                <FloatingLabelInput
                                    name={'password'}
                                    type={'password'}
                                    label={t('auth.common.password')}
                                />
                                <FloatingLabelInput
                                    name={'confirmPassword'}
                                    type={'password'}
                                    label={t('auth.common.confirmPassword')}
                                />
                            </div>

                            <div className="flex flex-col space-y-3">
                                <button
                                    className={`btn bg-the_game_purple border-none hover:bg-the_game_darkPurple text-white rounded-full`}
                                    type="submit"
                                >
                                    {t('auth.register.register')}
                                </button>

                                <button
                                    className={`btn bg-the_game_gray border-none hover:bg-gray-600 text-white rounded-full`}
                                    type="reset"
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div>
                            <div role="alert">{message}</div>
                        </div>
                    )}
                </Form>
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
