import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {MessageWithKey} from '@the-game/common/dist/types/chat/message';
import React, {useState, useEffect, KeyboardEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {Message} from 'yup';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {SendIcon} from '../svg/send.icon';
import {Panel} from '../util/panel/Panel';
import {ChatBubbleForeign, ChatBubbleOwn} from './ChatBubble';

export const Chat = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<MessageWithKey>>([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setUsername(user.username);

        const onChatMessage: WsListener<MessageWithKey> = (
            msg: MessageWithKey
        ) => {
            setMessages((currentMsg: MessageWithKey[]) => {
                return [
                    {
                        author: msg.author,
                        message: msg.message,
                        timestamp: msg.timestamp,
                        uid: msg.uid
                    },
                    ...currentMsg
                ];
            });
        };

        if (webSocketState.connected) {
            wsm.registerListener(
                ChatEvent.RECEIVE_GLOBAL_MESSAGE,
                onChatMessage
            );
        }

        return () => {
            wsm.removeListener(ChatEvent.RECEIVE_GLOBAL_MESSAGE, onChatMessage);
        };
    });

    useEffect(() => {
        const onChatHistory: WsListener<MessageWithKey[]> = (
            messages: MessageWithKey[]
        ) => {
            setMessages(messages);
        };

        if (webSocketState.connected) {
            wsm.registerListener(SystemEvent.CHAT_HISTORY, onChatHistory);

            setTimeout(() => {
                wsm.emit<void>({
                    event: SystemEvent.GET_CHAT_HISTORY
                });
            }, 1);
        }

        return () => {
            wsm.removeListener(SystemEvent.CHAT_HISTORY, onChatHistory);
        };
    }, [webSocketState]);

    const sendMessage = () => {
        if (message === '') return;

        wsm.emit<Message>({
            event: ChatEvent.SEND_GLOBAL_MESSAGE,
            data: {
                author: username,
                message,
                timestamp: Date.now()
            }
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
                <div className="last:border-b-0 h-full overflow-y-auto pr-3 flex flex-col-reverse">
                    {messages.map((msg, index) => {
                        return msg.author === username ? (
                            <ChatBubbleOwn
                                author={msg.author}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                uid={msg.uid}
                                key={index}
                            />
                        ) : (
                            <ChatBubbleForeign
                                author={msg.author}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                uid={msg.uid}
                                key={index}
                            />
                        );
                    })}
                </div>
                <div className="divider dark:before:bg-the_game_gray dark:after:bg-the_game_gray" />
                <div className="w-full flex space-x-3">
                    <input
                        id="chat-input"
                        type="text"
                        value={message}
                        placeholder={t('chat.inputPlaceholder') || ''}
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
                        <SendIcon />
                    </button>
                </div>
            </Panel>
        </div>
    );
};
