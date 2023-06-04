import {IngameMessageType} from '@the-game/common/dist/enum/game/ingameMessageType.enum';
import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {IngameMessage} from '@the-game/common/dist/types/chat/message';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import React, {useState, useEffect, KeyboardEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import gameidState from '../../common/states/gameid.state';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {SaveDownIcon} from '../game/buttons/utils/SaveDownIcon';
import {SaveUpIcon} from '../game/buttons/utils/SaveUpIcon';
import {StopIcon} from '../game/buttons/utils/StopIcon';
import {SendIcon} from '../svg/send.icon';
import {Panel} from '../util/panel/Panel';
import {ChatBubbleForeign, ChatBubbleOwn} from './ChatBubble';
import {GameIntervention} from './GameIntervention';

export const GameChat = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);
    const gameId = useRecoilValue(gameidState);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<IngameMessage>>([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!gameId) {
            navigate('/lobby');
            return;
        }

        const onChatMessage: WsListener<IngameMessage> = (
            msg: IngameMessage
        ) => {
            setMessages((currentMsg: IngameMessage[]) => {
                return [
                    {
                        authorUid: msg.authorUid,
                        authorName: msg.authorName,
                        message: msg.message,
                        timestamp: msg.timestamp,
                        gameUid: msg.gameUid,
                        type: msg.type
                    },
                    ...currentMsg
                ];
            });
        };

        const onIntervention: WsListener<GameInterventionDto> = (
            intervention: GameInterventionDto
        ) => {
            const message =
                intervention.type === IngameMessageType.BLOCK_INTERVENTION
                    ? t('game.blockMessage', {
                          player: intervention.playerName,
                          stack: intervention.stackIndex
                      })
                    : t('game.saveMessage', {
                          player: intervention.playerName,
                          stack: intervention.stackIndex
                      });

            setMessages((currentMsg: IngameMessage[]) => {
                return [
                    {
                        authorUid: intervention.playerUid,
                        authorName: intervention.playerName,
                        message: message,
                        timestamp: intervention.timestamp,
                        gameUid: intervention.gameUid,
                        type: intervention.type
                    },
                    ...currentMsg
                ];
            });
        };

        wsm.registerListener(ChatEvent.INGAME_MESSAGE, onChatMessage);
        wsm.registerListener(GameEvent.BLOCK_INTERVENTION, onIntervention);
        wsm.registerListener(GameEvent.SAVE_INTERVENTION, onIntervention);

        return () => {
            wsm.removeListener(ChatEvent.INGAME_MESSAGE, onChatMessage);
            wsm.removeListener(GameEvent.BLOCK_INTERVENTION, onIntervention);
            wsm.removeListener(GameEvent.SAVE_INTERVENTION, onIntervention);
        };
    });

    useEffect(() => {
        wsm.emit<{gameUid: string}>({
            event: ChatEvent.INGAME_CHAT_HISTORY,
            data: {
                gameUid: gameId
            }
        });

        const onChatHistory: WsListener<IngameMessage[]> = (
            messages: IngameMessage[]
        ) => {
            setMessages(messages);
        };

        wsm.registerListener(ChatEvent.INGAME_CHAT_HISTORY, onChatHistory);

        return () => {
            wsm.removeListener(ChatEvent.INGAME_CHAT_HISTORY, onChatHistory);
        };
    }, [webSocketState]);

    const sendMessage = () => {
        if (message === '') return;

        wsm.emit<IngameMessage>({
            event: ChatEvent.INGAME_MESSAGE,
            data: {
                gameUid: gameId,
                authorUid: user!.uid,
                authorName: user!.username,
                message,
                timestamp: Date.now(),
                type: IngameMessageType.CHAT
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
                        return msg.type !== IngameMessageType.CHAT ? (
                            <GameIntervention msg={msg} key={index} />
                        ) : msg.type === IngameMessageType.CHAT &&
                          msg.authorUid === user!.uid ? (
                            <ChatBubbleOwn msg={msg} key={index} />
                        ) : (
                            <ChatBubbleForeign msg={msg} key={index} />
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
