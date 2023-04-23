import {Form, Formik} from 'formik';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {ResetPasswordPayload} from '../../common/types/resetPasswordPayload';
import AuthService from '../../services/auth/auth.service';
import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {FloatingLabelInput} from '../util/input/FloatingLabelInput';
import {BigTitle} from '../util/title/BigTitle';
import * as Yup from 'yup';

export const ResetPassword: FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [message, setMessage] = React.useState('');

    const initialValues = {
        resetCode: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = () => {
        const passwordInvalid = t(
            'auth.common.errors.invalidPassword'
        ).toString();

        return Yup.object().shape({
            resetCode: Yup.string().required(
                t('auth.common.errors.requiredResetCode').toString()
            ),
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

    const handleSubmit = (values: ResetPasswordPayload) => {
        setMessage('');

        AuthService.resetPassword(values).then(
            () => {
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
                    {t('auth.passwordReset.resetInfo')}
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
                                name={'resetCode'}
                                type={'text'}
                                label={t('auth.passwordReset.resetCode')}
                            />
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
                        <div className="flex flex-col space-y-2">
                            <button
                                className={
                                    'btn bg-the_game_purple border-none hover:bg-the_game_darkPurple text-white rounded-full'
                                }
                                type="submit"
                            >
                                {t('auth.passwordReset.resetPassword')}
                            </button>
                            <button
                                className={`btn bg-the_game_gray border-none hover:bg-gray-600 text-white rounded-full`}
                                type="reset"
                            >
                                {t('common.cancel')}
                            </button>
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
