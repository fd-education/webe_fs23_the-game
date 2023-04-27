import {Field, Form, Formik} from 'formik';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import AuthService from '../../services/auth/auth.service';
import UserService from '../../services/profile/profile.service';
import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {RulesButton} from '../util/button/RulesButton';
import {FloatingLabelInput} from '../util/input/FloatingLabelInput';
import {Panel} from '../util/panel/Panel';
import {SmallTitle} from '../util/title/SmallTitle';
import * as Yup from 'yup';

export const Profile: FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const uid = localStorage.getItem('user_id');

        if (!uid) {
            navigate('/login');
            return;
        }

        UserService.getProfile(uid).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
        });
    }, []);

    const initialValues = {
        firstname: 'user?.firstname',
        lastname: 'user?.lastname',
        username: 'user?.username',
        email: 'user?.email',
        password: '',
        confirmPassword: '',
        avatar: ''
    };

    const handleUpdate = () => {
        console.log('update');
    };

    const handleCancellation = () => {
        console.log('cancel');
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

    return (
        <div className="flex flex-col items-center p-4 h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full">
            <SmallTitle />

            <div className="grow flex flex-row w-full p-8 space-x-8">
                <Panel className="grow h-full justify-center">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleUpdate}
                        onReset={handleCancellation}
                        validationSchema={validationSchema}
                    >
                        <Form className="flex flex-col space-y-5">
                            <div className="m-auto relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {'user?.username'.slice(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-3">
                                <div className="flex flex-row space-x-4 justify-center">
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
                                </div>
                                <div className="flex flex-row space-x-4 justify-center">
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
                            </div>
                            <div className="flex flex-row space-x-4 justify-center">
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

                            <div className="flex flex-row space-x-4 justify-center">
                                <button
                                    className={`btn bg-the_game_purple border-none hover:bg-the_game_darkPurple text-white rounded-full`}
                                    type="submit"
                                >
                                    {t('profile.update')}
                                </button>

                                <button
                                    className={`btn bg-the_game_gray border-none hover:bg-gray-600 text-white rounded-full`}
                                    type="reset"
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </Panel>
                <Panel className="grow h-full" />
            </div>

            <div className="flex flex-col items-center space-y-6">
                <RulesButton />
                <PreferenceToggles
                    togglesToDisplay={{
                        screenMode: true,
                        language: true,
                        logout: true,
                        home: true
                    }}
                />
            </div>
        </div>
    );
};
