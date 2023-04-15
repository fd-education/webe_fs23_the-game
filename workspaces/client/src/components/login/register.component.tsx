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
        <div>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleRegister}
                    validationSchema={validationSchema}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div>
                                    <label htmlFor="firstname">firstname</label>
                                    <Field
                                        name={'firstname'}
                                        type="text"
                                        placeholder="firstname"
                                    />
                                    <ErrorMessage
                                        name={'firstname'}
                                        component={'div'}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastname">lastname</label>
                                    <Field
                                        name={'lastname'}
                                        type="text"
                                        placeholder="lastname"
                                    />
                                    <ErrorMessage
                                        name={'lastname'}
                                        component={'div'}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">username</label>
                                    <Field
                                        name={'username'}
                                        type="text"
                                        placeholder="username"
                                    />
                                    <ErrorMessage
                                        name={'username'}
                                        component={'div'}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">email</label>
                                    <Field
                                        name={'email'}
                                        type="text"
                                        placeholder="email"
                                    />
                                    <ErrorMessage
                                        name={'email'}
                                        component={'div'}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <Field
                                        name={'password'}
                                        type="password"
                                        placeholder="password"
                                    />
                                    <ErrorMessage
                                        name={'password'}
                                        component={'div'}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword">
                                        confirmPassword
                                    </label>
                                    <Field
                                        name={'confirmPassword'}
                                        type="password"
                                        placeholder="confirmPassword"
                                    />
                                    <ErrorMessage
                                        name={'confirmPassword'}
                                        component={'div'}
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit">Register</button>
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
        </div>
    );
};
