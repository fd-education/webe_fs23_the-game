import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';
import {LobbyChat} from './components/chat/LobbyChat';
import React, {FC, useEffect} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProtectedRoute from './components/util/routes/ProtectedRoute';
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
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
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
                    <Route
                        path={'/profile'}
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={'/lobby'}
                        element={
                            <ProtectedRoute>
                                <Lobby />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={'/game'}
                        element={
                            <ProtectedRoute>
                                <Game />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={'/chat'}
                        element={
                            <ProtectedRoute>
                                <LobbyChat />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
