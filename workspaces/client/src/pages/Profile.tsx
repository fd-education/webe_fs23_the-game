import {User} from '@the-game/common/dist/types/auth/user';
import {ProfileUpdate} from '@the-game/common/dist/types/profile/profileUpdate';
import {Form, Formik} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import preferenceService from '../services/preference/preference.service';
import ProfileService from '../services/profile/user.service';
import profileService from '../services/profile/user.service';
import UserService from '../services/profile/user.service';
import {profileValidation} from '../services/validation/profile.validation';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {FloatingLabelInput} from '../components/util/input/FloatingLabelInput';
import {Panel} from '../components/util/panel/Panel';
import {SmallTitle} from '../components/util/title/SmallTitle';

export const Profile: FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [user, setUser] = useState({} as User);

    useEffect(() => {
        const uid = localStorage.getItem('user_id');

        if (!uid) {
            navigate('/login');
            return;
        }

        UserService.getUser(uid).then((res) => {
            const user = res.data;

            if (user === undefined) {
                navigate('/login');
            } else {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
            }
        });
    }, [navigate]);

    const handleUpdate = async (formValue: ProfileUpdate) => {
        const formData = formValue;

        if (formValue.password === '') {
            delete formData.password;
            delete formData.confirmPassword;
        }

        const profileData = {
            ...formValue,
            lang: preferenceService.getLanguage(),
            theme: preferenceService.getTheme()
        };

        try {
            const response = await profileService.updateUser(profileData);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletion = () => {
        const uid = localStorage.getItem('user_id');

        if (!uid) {
            navigate('/login');
            return;
        }

        ProfileService.deleteUser(uid).then((res) => {
            const user = res.data;

            if (user === undefined) {
                navigate('/login');
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('user_id');
                navigate('/login');
            }
        });
    };

    return (
        <div className="flex flex-col items-center p-8 h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full space-y-10">
            <SmallTitle />

            <div className="flex grow flex-row space-x-8">
                <Panel className="grow h-full justify-center px-5">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            uid: user.uid ?? '',
                            firstname: user.firstname ?? '',
                            lastname: user.lastname ?? '',
                            username: user.username ?? '',
                            email: user.email ?? '',
                            password: '',
                            confirmPassword: ''
                        }}
                        onSubmit={handleUpdate}
                        validationSchema={profileValidation}
                    >
                        <Form className="flex flex-col space-y-5">
                            <div className="m-auto relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {user.username?.slice(0, 2).toUpperCase()}
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

                                <button
                                    className={`btn bg-red-800 border-none hover:bg-gray-600 text-white rounded-full`}
                                    type={'button'}
                                    onClick={handleDeletion}
                                >
                                    {t('profile.delete')}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </Panel>
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
