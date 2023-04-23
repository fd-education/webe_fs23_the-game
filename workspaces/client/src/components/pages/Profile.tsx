import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthService from '../../services/auth/auth.service';
import UserService from '../../services/profile/profile.service';
import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {RulesButton} from '../util/button/RulesButton';
import {Panel} from '../util/panel/Panel';
import {SmallTitle} from '../util/title/SmallTitle';

export const Profile: FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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

    return (
        <div className="flex flex-col items-center p-4 h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full bg-primaryLight dark:bg-primaryDark">
            <SmallTitle />

            <div className="grow flex flex-row w-full p-8 space-x-8">
                <Panel className="grow h-full" />
                <Panel className="grow h-full" />
            </div>

            <div className="flex flex-col items-center space-y-8">
                <RulesButton />
                <PreferenceToggles
                    togglesToDisplay={{screenMode: true, language: true}}
                />
            </div>
        </div>
    );
};
