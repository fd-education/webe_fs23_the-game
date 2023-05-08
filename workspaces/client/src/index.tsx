import React from 'react';
import ReactDOM from 'react-dom/client';
import {RecoilRoot} from 'recoil';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import './styles/icons.css';
import './styles/scrollbar.css';
import './styles/index.css';

import './i18n';
import {WebSocketProvider} from './common/websocket/websocket.provider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <WebSocketProvider>
                    <App />
                </WebSocketProvider>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);
