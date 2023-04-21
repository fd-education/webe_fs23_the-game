import {Chat} from './components/chat/Chat';
import React, {FC, useEffect} from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import {User} from './common/types/user';
import {RequestToken} from './components/pages/RequestToken';
import AuthService from './services/auth/auth.service';
import {Route, Routes} from 'react-router-dom';
import {Profile} from './components/pages/Profile';
import {Register} from './components/pages/Registration';
import {Login} from './components/pages/Login';
import EventBus from './common/eventbus/eventBus';

const App: FC = () => {
    const [currentUser, setCurrentUser] = React.useState<User | undefined>(
        undefined
    );

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

        EventBus.on('logout', logOut);

        return () => {
            EventBus.remove('logout', logOut);
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <div>
            <div>
                <Routes>
                    <Route path={'/'} element={<Login />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/request-token'} element={<RequestToken />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/chat'} element={<Chat />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
