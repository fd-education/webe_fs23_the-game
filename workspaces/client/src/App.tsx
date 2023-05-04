import {Lang} from '@the-game/common/dist/enum/lang.enum';
import {Theme} from '@the-game/common/dist/enum/theme.enum';
import {Chat} from './components/chat/Chat';
import React, {FC, useEffect} from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import {User} from './common/types/user';
import {Game} from './components/pages/Game';
import {Lobby} from './components/pages/Lobby';
import {RequestToken} from './components/pages/RequestToken';
import {ResetPassword} from './components/pages/ResetPassword';
import AuthService from './services/auth/auth.service';
import {Route, Routes} from 'react-router-dom';
import {Profile} from './components/pages/Profile';
import {Register} from './components/pages/Registration';
import {Login} from './components/pages/Login';
import PreferenceService from './services/preference/preference.service';

const App: FC = () => {
    const [currentUser, setCurrentUser] = React.useState<User | undefined>(
        undefined
    );

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            PreferenceService.setLanguage(user.language);
            PreferenceService.setTheme(user.theme);
        } else {
            PreferenceService.setLanguage(Lang.default);
            PreferenceService.setTheme(Theme.default);
        }
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
