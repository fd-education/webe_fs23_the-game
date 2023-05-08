import {FC, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useWebSocket from '../../hooks/useWebSocket';
import {refreshAccessToken} from '../../services/api';
import UserService from '../../services/profile/profile.service';
import {Chat} from '../chat/Chat';
import {LobbyOverview} from '../lobby-overview/LobbyOverview';
import {PreferenceToggles} from '../util/button/PreferenceToggles';
import {RulesButton} from '../util/button/RulesButton';
import {Panel} from '../util/panel/Panel';
import {SmallTitle} from '../util/title/SmallTitle';

export const Lobby: FC = () => {
    const {wsm} = useWebSocket();
    const navigate = useNavigate();

    const refreshAccessTokenCallback = useCallback(async () => {
        await refreshAccessToken();
    }, []);

    useEffect(() => {
        const uid = localStorage.getItem('user_id');

        if (!uid) {
            navigate('/login');
            return;
        }

        refreshAccessTokenCallback().catch(console.error);
        wsm.connect();

        UserService.getProfile(uid).then((res) => {
            const user = res.data;

            if (user === undefined) {
                navigate('/login');
            } else {
                localStorage.setItem('user', JSON.stringify(user));
            }
        });

        return () => {
            wsm.disconnect();
        };
    }, [navigate]);

    return (
        <div className="flex flex-row bg-primaryLight dark:bg-primaryDark">
            <div className="w-full h-screen p-8">
                <Chat />
            </div>

            <div className="flex flex-col items-center p-4 min-h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full">
                <SmallTitle />

                <div className="w-full h-full py-8 px-4">
                    <LobbyOverview />
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
