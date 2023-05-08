import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import React, {useState, useEffect, KeyboardEvent} from 'react';
import {User} from '../../common/types/user';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {SendIcon} from '../svg/send.icon';
import {Panel} from '../util/panel/Panel';
import {Message, MessageWithKey} from '../../common/types/message';
import {ChatBubbleForeign, ChatBubbleOwn} from './ChatBubble';

export const Chat = () => {
    const {wsm} = useWebSocket();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<Message>>([]);

    useEffect(() => {
        const onChatMessage: WsListener<Message> = (msg: Message) => {
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
        };

        wsm.registerListener(ChatEvent.RECEIVE_GLOBAL_MESSAGE, onChatMessage);

        const user = localStorage.getItem('user');

        if (user === null) {
            // TODO: Redirect to login
        } else {
            setUsername((JSON.parse(user) as User).username);
        }

        return () => {
            wsm.removeListener(ChatEvent.RECEIVE_GLOBAL_MESSAGE, onChatMessage);
        };
    }, []);

    const sendMessage = () => {
        if (message === '') return;

        wsm.emit<{author: string; message: string; timestamp: number}>({
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
                <div className="divider dark:before:bg-the_game_gray dark:after:bg-the_game_gray" />
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
                        <SendIcon />
                    </button>
                </div>
            </Panel>
        </div>
    );
};
