import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';
import {RegistrationPayload} from '@the-game/common/dist/types/auth/registrationPayload';
import {useTranslation} from 'react-i18next';
import {Error} from '../components/error/Error';
import {registrationValidation} from '../services/validation/registrationValidation';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {FloatingLabelInput} from '../components/util/input/FloatingLabelInput';
import {Form, Formik} from 'formik';
import React, {FC} from 'react';
import AuthService from '../services/auth/auth.service';
import {useNavigate} from 'react-router-dom';
import {BigTitle} from '../components/util/title/BigTitle';

export const Register: FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

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

    const handleRegistration = async (formValue: RegistrationPayload) => {
        try {
            setLoading(true);
            const response = await AuthService.register(formValue);

            if (response.status === 200) {
                navigate('/login');
            } else {
                displayError();
            }
        } catch (_) {
            displayError();
        }
    };

    const displayError = () => {
        setLoading(false);
        setError(true);
        setErrorMessage('registrationFailed');
    };

    const handleCancellation = () => {
        navigate('/login');
    };

    return (
        <>
            <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-between bg-primaryLight dark:bg-primaryDark bg-cards bg-fill bg-scroll bg-cards-background bg-no-repeat">
                <BigTitle />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleRegistration}
                    onReset={handleCancellation}
                    validationSchema={registrationValidation}
                >
                    <Form className="flex flex-col space-y-5 w-1/5">
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
                                    className={`btn bg-the_game_purple border-none hover:bg-the_game_darkPurple text-white rounded-full ${
                                        loading && 'loading'
                                    }`}
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
                    </Form>
                </Formik>

                <div className="flex flex-col  w-full max-w-[25%] items-center space-y-8">
                    <RulesButton />

                    <PreferenceToggles
                        togglesToDisplay={{screenMode: true, language: true}}
                    />
                </div>
            </div>

            {error && (
                <Error
                    message={errorMessage}
                    onErrorClose={() => setError(false)}
                />
            )}
        </>
    );
};
