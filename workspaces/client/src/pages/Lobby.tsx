import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {UserAnnouncement} from '@the-game/common/dist/types/playerOverview/userAnnouncement';
import {FC, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import UserRepository from '../common/localstorage/user.repository';
import userState from '../common/states/user.state';
import {TablesView} from '../components/tables/TablesView';
import {GlobalPlayerView} from '../components/users/GlobalPlayerView';
import useWebSocket from '../hooks/useWebSocket';
import {LobbyChat} from '../components/chat/LobbyChat';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {SmallTitle} from '../components/util/title/SmallTitle';
import UserService from '../services/profile/user.service';

export const Lobby: FC = () => {
    const {wsm} = useWebSocket();
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const fetchUser = useCallback(async () => {
        const uid = UserRepository.getUserId();
        if (!uid) {
            navigate('/login');
            return;
        }

        const fetchResult = await UserService.getUser(uid);
        if (fetchResult.data) {
            setUser(fetchResult.data);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            fetchUser().catch(console.error);
        }

        if (!user) {
            navigate('/login');
            return;
        }

        wsm.emit<UserAnnouncement>({
            event: SystemEvent.ANNOUNCE_USER,
            data: {
                uid: user.uid,
                username: user.username
            }
        });
    }, []);

    return (
        <div className="flex flex-row bg-primaryLight dark:bg-primaryDark">
            <div className="w-full h-screen p-8">
                <LobbyChat />
            </div>

            <div className="flex flex-col content-start items-center p-8 h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full">
                <SmallTitle />

                <div className="w-full h-[65%] px-4">
                    <TablesView />
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
            <div className="flex flex-col justify-around w-full h-screen p-8 space-y-10">
                <GlobalPlayerView />
            </div>
        </div>
    );
};
