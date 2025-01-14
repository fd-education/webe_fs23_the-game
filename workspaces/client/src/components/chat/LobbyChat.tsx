import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
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

export const LobbyChat = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<MessageWithKey>>([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const onChatMessage: WsListener<MessageWithKey> = (
            msg: MessageWithKey
        ) => {
            setMessages((currentMsg: MessageWithKey[]) => {
                return [
                    {
                        authorUid: msg.authorUid,
                        authorName: msg.authorName,
                        message: msg.message,
                        timestamp: msg.timestamp,
                        uid: msg.uid
                    },
                    ...currentMsg
                ];
            });
        };

        if (webSocketState.connected) {
            wsm.registerListener(ChatEvent.GLOBAL_MESSAGE, onChatMessage);
        }

        return () => {
            wsm.removeListener(ChatEvent.GLOBAL_MESSAGE, onChatMessage);
        };
    });

    useEffect(() => {
        const onChatHistory: WsListener<MessageWithKey[]> = (
            messages: MessageWithKey[]
        ) => {
            setMessages(messages);
        };

        if (webSocketState.connected) {
            wsm.registerListener(ChatEvent.GLOBAL_CHAT_HISTORY, onChatHistory);

            setTimeout(() => {
                wsm.emit<void>({
                    event: ChatEvent.GLOBAL_CHAT_HISTORY
                });
            }, 1);
        }

        return () => {
            wsm.removeListener(ChatEvent.GLOBAL_CHAT_HISTORY, onChatHistory);
        };
    }, [webSocketState]);

    const sendMessage = () => {
        if (message === '') return;
        if (!user) return;

        wsm.emit<Message>({
            event: ChatEvent.GLOBAL_MESSAGE,
            data: {
                authorUid: user.uid,
                authorName: user.username,
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
                        return user && msg.authorUid === user.uid ? (
                            <ChatBubbleOwn msg={msg} key={index} />
                        ) : (
                            <ChatBubbleForeign msg={msg} key={index} />
                        );
                    })}
                </div>
                <div className="divider dark:before:bg-the_game_gray dark:after:bg-the_game_gray" />
                <div className="flex space-x-3">
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
