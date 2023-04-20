import {FloatingLabelInput} from '../../components/util/FloatingLabelInput';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {RegistrationPayload} from '../../common/types/registrationPayload';
import React, {FC} from 'react';
import * as Yup from 'yup';
import {Lang} from '../../common/enum/lang.enum';
import {Theme} from '../../common/enum/theme.enum';
import AuthService from '../../services/auth.service';
import {useNavigate} from 'react-router-dom';

export const Register: FC = () => {
    const [successful, setSuccessful] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

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
        return Yup.object().shape({
            firstname: Yup.string().required('Firstname is required'),
            lastname: Yup.string().required('Lastname is required'),
            username: Yup.string()
                .min(5, 'Username must be between 5 and 30 characters.')
                .max(30, 'Username must be between 5 and 30 characters.')
                .required('Username is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .matches(/\W/, 'Password requires a symbol')
                .required('Password is required'),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('password')],
                'Must match "Password" field value'
            )
        });
    };

    const handleRegister = (formValue: RegistrationPayload) => {
        const {confirmPassword: string, ...formValueWithoutConfirmPassword} =
            formValue;

        AuthService.register(formValueWithoutConfirmPassword).then(
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

    return (
        <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-primaryLight">
            <Formik
                initialValues={initialValues}
                onSubmit={handleRegister}
                validationSchema={validationSchema}
            >
                <Form className="flex flex-col space-y-5 w-1/5">
                    {!successful && (
                        <div className="flex flex-col space-y-8">
                            <div className="flex flex-col space-y-3">
                                <FloatingLabelInput
                                    name={'firstname'}
                                    type={'text'}
                                    label={'Firstname'}
                                />
                                <FloatingLabelInput
                                    name={'lastname'}
                                    type={'text'}
                                    label={'Lastname'}
                                />
                                <FloatingLabelInput
                                    name={'username'}
                                    type={'text'}
                                    label={'Username'}
                                />
                                <FloatingLabelInput
                                    name={'email'}
                                    type={'text'}
                                    label={'E-Mail'}
                                />
                            </div>
                            <div className="flex flex-col space-y-3">
                                <FloatingLabelInput
                                    name={'password'}
                                    type={'password'}
                                    label={'Password'}
                                />
                                <FloatingLabelInput
                                    name={'confirmPassword'}
                                    type={'password'}
                                    label={'Confirm Password'}
                                />
                            </div>

                            <div className="flex flex-col space-y-3">
                                <button
                                    className={`btn bg-the_game_purple hover:bg-the_game_darkPurple text-white rounded-full`}
                                    type="submit"
                                >
                                    Register
                                </button>

                                <button
                                    className={`btn bg-the_game_gray hover:bg-the_game_darkPurple text-white rounded-full`}
                                    type="reset"
                                >
                                    Cancel
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
        </div>
    );
};
