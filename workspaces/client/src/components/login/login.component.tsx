import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {RulesButton} from '../util/button/RulesButton';
import {FloatingLabelInput} from '../util/input/FloatingLabelInput';
import {Form, Formik} from 'formik';
import React, {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {LoginPayload} from '../../common/types/loginPayload';
import AuthService from '../../services/auth.service';
import {BigTitle} from '../util/title/BigTitle';

export const Login: FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const initialValues: LoginPayload = {
        email: '',
        password: ''
    };

    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string()
                .email('This is not a valid email address.')
                .required('Email is required'),
            password: Yup.string().required('Password is required')
        });
    };

    const handleLogin = (formValue: LoginPayload) => {
        setMessage('');
        setLoading(true);

        AuthService.login(formValue).then(
            () => {
                navigate('/profile');
                window.location.reload();
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-between bg-primaryLight dark:bg-primaryDark bg-cards bg-fixed bg-1.4 bg-cards-background bg-no-repeat">
            <BigTitle />

            <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form className="flex flex-col space-y-5 w-1/5">
                        <div className="flex flex-col space-y-3">
                            <FloatingLabelInput
                                name={'email'}
                                type={'text'}
                                label={'Email'}
                            />
                            <div>
                                <FloatingLabelInput
                                    name={'password'}
                                    type={'password'}
                                    label={'Password'}
                                />
                                <Link
                                    className="text-sm text-the_game_purple"
                                    to={'/password-reset'}
                                >
                                    Forgot password?
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
                                {(loading && 'Logging in ...') || 'Log in'}
                            </button>
                            <Link
                                className="text-sm text-the_game_purple"
                                to={'/register'}
                            >
                                No Account? Register!
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
