import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';
import {Chat} from './components/chat/Chat';
import React, {FC, useEffect} from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import useWebSocket from './hooks/useWebSocket';
import {Game} from './pages/Game';
import {Lobby} from './pages/Lobby';
import {RequestToken} from './pages/RequestToken';
import {ResetPassword} from './pages/ResetPassword';
import AuthService from './services/auth/auth.service';
import {Route, Routes} from 'react-router-dom';
import {Profile} from './pages/Profile';
import {Register} from './pages/Registration';
import {Login} from './pages/Login';
import PreferenceService from './services/preference/preference.service';

const App: FC = () => {
    const {wsm} = useWebSocket();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            PreferenceService.setLanguage(user.language);
            PreferenceService.setTheme(user.theme);
        } else {
            PreferenceService.setLanguage(Lang.default);
            PreferenceService.setTheme(Theme.default);
        }

        return () => {
            wsm.disconnect();
        };
    }, []);

    return (
        <div>
            <div>
                <Routes>
                    <Route path={'/'} element={<Login />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/request-token'} element={<RequestToken />} />
                    <Route
                        path={'/reset-password'}
                        element={<ResetPassword />}
                    />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/lobby'} element={<Lobby />} />
                    <Route path={'/game'} element={<Game />} />
                    <Route path={'/chat'} element={<Chat />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
