import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../../common/types/user';
import UserService from '../../services/profile/profile.service';
import {Chat} from '../chat/Chat';
import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {RulesButton} from '../util/button/RulesButton';
import {Panel} from '../util/panel/Panel';
import {SmallTitle} from '../util/title/SmallTitle';

export const Lobby: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const uid = localStorage.getItem('user_id');

        if (!uid) {
            navigate('/login');
            return;
        }

        UserService.getProfile(uid).then((res) => {
            const user = res.data;

            if (user === undefined) {
                console.log('No User found');
                navigate('/login');
            } else {
                localStorage.setItem('user', JSON.stringify(user));
            }
        });
    }, [navigate]);

    return (
        <div className="flex flex-row bg-primaryLight dark:bg-primaryDark">
            <div className="w-full h-screen p-8">
                <Chat />
            </div>

            <div className="flex flex-col items-center p-4 min-h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full">
                <SmallTitle />

                <div className="w-full h-full py-8 px-4">
                    <Panel />
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <RulesButton />
                    <PreferenceToggles
                        togglesToDisplay={{
                            screenMode: true,
                            language: true,
                            logout: true,
                            profile: true
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-around w-full p-8 space-y-10">
                <Panel />
                <Panel />
            </div>
        </div>
    );
};
