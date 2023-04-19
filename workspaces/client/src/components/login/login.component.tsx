import {FloatingLabelInput} from '../../components/util/FloatingLabelInput';
import {
    ErrorMessage,
    Field,
    Form,
    Formik,
    FormikProps,
    FormikValues
} from 'formik';
import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {LoginPayload} from '../../common/types/loginPayload';
import AuthService from '../../services/auth.service';

interface LoginValues {
    email: string;
    password: string;
}

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
        <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-primaryLight">
            <>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                    {() => (
                        <Form>
                            <FloatingLabelInput
                                name={'email'}
                                type={'text'}
                                label={'Email'}
                            />{' '}
                            <FloatingLabelInput
                                name={'password'}
                                type={'password'}
                                label={'Password'}
                            />
                            {message && (
                                <div>
                                    <div role="alert">{message}</div>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </>
        </div>
    );
};
