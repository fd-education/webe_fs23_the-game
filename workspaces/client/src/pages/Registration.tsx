import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';
import {useTranslation} from 'react-i18next';
import {registrationValidation} from '../services/validation/registrationValidation';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {FloatingLabelInput} from '../components/util/input/FloatingLabelInput';
import {Form, Formik} from 'formik';
import {RegistrationPayload} from '../common/types/registrationPayload';
import React, {FC} from 'react';
import AuthService from '../services/auth/auth.service';
import {useNavigate} from 'react-router-dom';
import {BigTitle} from '../components/util/title/BigTitle';

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

    const handleRegister = async (formValue: RegistrationPayload) => {
        try {
            const response = await AuthService.register(formValue);

            if (response.status === 200) {
                setSuccessful(true);
                navigate('/login');
            } else {
                // TO DO: Proper Error Handling
                setMessage('Registration failed');
                setSuccessful(false);
            }
        } catch (error: any) {
            const resMessage =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            setMessage(resMessage.toString());
            setSuccessful(false);
        }
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
                validationSchema={registrationValidation}
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
