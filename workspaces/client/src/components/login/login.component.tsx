import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {LoginPayload} from '../../common/types/loginPayload';
import AuthService from '../../services/auth.service';

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
            email: Yup.string().required('Email is required'),
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
        <div>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <div>
                            <label htmlFor="email">email</label>
                            <Field
                                name={'email'}
                                type="text"
                                placeholder="email"
                            />
                            <ErrorMessage name={'email'} component={'div'} />
                        </div>

                        <div>
                            <label htmlFor="password">password</label>
                            <Field
                                name={'password'}
                                type="password"
                                placeholder="password"
                            />
                            <ErrorMessage name={'password'} component={'div'} />
                        </div>

                        <div>
                            <button type="submit">Login</button>
                        </div>

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
