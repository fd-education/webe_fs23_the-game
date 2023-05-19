import {PlayerEvent} from '@the-game/common/dist/enum/websockets/events/player-event.enum';
import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {FC, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import UserRepository from '../common/localstorage/user.repository';
import userState from '../common/states/user.state';
import websocketState from '../common/states/websocket.state';
import {WebSocketProvider} from '../common/websocket/websocket.provider';
import {GlobalPlayerOverview} from '../components/players-overview/GlobalPlayerOverview';
import useWebSocket from '../hooks/useWebSocket';
import {refreshAccessToken} from '../services/api';
import {Chat} from '../components/chat/Chat';
import {LobbyOverview} from '../components/lobby-overview/LobbyOverview';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import {RulesButton} from '../components/util/button/RulesButton';
import {SmallTitle} from '../components/util/title/SmallTitle';
import UserService from '../services/profile/user.service';

export const Lobby: FC = () => {
    const {wsm} = useWebSocket();
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const webSocketState = useRecoilValue(websocketState);

    const refreshAccessTokenCallback = useCallback(async () => {
        await refreshAccessToken();
    }, []);

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

        refreshAccessTokenCallback().catch(console.error);
        wsm.connect(WebsocketNamespaces.LOBBY, user);

        return () => {
            wsm.disconnect();
        };
    }, [fetchUser]);

    return (
        <WebSocketProvider>
            <div className="flex flex-row bg-primaryLight dark:bg-primaryDark">
                <div className="w-full h-screen p-8">
                    <Chat />
                </div>

                <div className="flex flex-col content-start items-center p-8 h-screen justify-between bg-primaryLight dark:bg-primaryDark w-full">
                    <SmallTitle />

                    <div className="w-full h-[65%] px-4">
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
                <div className="flex flex-col justify-around w-full h-screen p-8 space-y-10">
                    <GlobalPlayerOverview />
                </div>
            </div>
        </WebSocketProvider>
    );
};
