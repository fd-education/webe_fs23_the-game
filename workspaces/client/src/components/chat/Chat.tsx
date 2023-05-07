import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import io from 'socket.io-client';
import React, {useState, useEffect, KeyboardEvent, useCallback} from 'react';
import {User} from '../../common/types/user';
import {refreshAccessToken} from '../../services/api';
import {Panel} from '../util/panel/Panel';
import {Message, MessageWithKey} from '../../common/types/message';
import {ChatBubbleForeign, ChatBubbleOwn} from './ChatBubble';

let socket: any;

export const Chat = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<Message>>([]);

    const refreshAccessTokenCallback = useCallback(async () => {
        await refreshAccessToken();
    }, []);

    useEffect(() => {
        refreshAccessTokenCallback().catch(console.error);
        socketInitializer().catch(console.error);

        const user = localStorage.getItem('user');
        console.log(user);

        if (user === null) {
            // TODO: Redirect to login
        } else {
            console.log((JSON.parse(user) as User).username);
            setUsername((JSON.parse(user) as User).username);
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    const socketInitializer = async () => {
        socket = io('http://localhost:9000/' + WebsocketNamespaces.LOBBY, {
            auth: {
                token: localStorage.getItem('token')
            },
            extraHeaders: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        socket.on(ChatEvent.RECEIVE_GLOBAL_MESSAGE, (msg: Message) => {
            setMessages((currentMsg: Message[]) => {
                return [
                    {
                        author: msg.author,
                        message: msg.message,
                        timestamp: msg.timestamp
                    },
                    ...currentMsg
                ];
            });
        });
    };

    const sendMessage = async () => {
        if (message === '') return;

        socket.emit(ChatEvent.SEND_GLOBAL_MESSAGE, {
            author: username,
            message,
            timestamp: Date.now()
        });
        setMessage('');
    };

    const handleKeypress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (message) {
                sendMessage();
            }
        }
    };

    return (
        <div className="flex items-center h-full justify-center bg-primaryLight dark:bg-primaryDark">
            <Panel className="justify-end">
                <div className="last:border-b-0 overflow-y-auto pr-3 flex flex-col-reverse">
                    {messages.map((message, key) => {
                        const msg: MessageWithKey = {...message, key};

                        return msg.author === username ? (
                            <ChatBubbleOwn
                                author={msg.author}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                key={msg.key}
                            />
                        ) : (
                            <ChatBubbleForeign
                                author={msg.author}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                key={msg.key}
                            />
                        );
                    })}
                </div>
                <div className="divider" />
                <div className="w-full flex space-x-3">
                    <input
                        id="chat-input"
                        type="text"
                        value={message}
                        placeholder="Write here ..."
                        className="input w-full flex-1 h-10 rounded-full bg-white"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={handleKeypress}
                    />

                    <button
                        className="w-10 h-10 bg-the_game_purple rounded-full"
                        onClick={() => {
                            sendMessage();
                        }}
                    >
                        <i className="bi bi-send-fill text-black icon-size-m"></i>
                    </button>
                </div>
            </Panel>
        </div>
    );
};
