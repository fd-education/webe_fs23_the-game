import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {
    GameCreateDto,
    GameCreateResponseDto
} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {Lobby} from '@the-game/common/dist/types/lobby/lobby';
import {Field, Form, Formik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import UserRepository from '../../common/localstorage/user.repository';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {PlusIcon} from '../svg/plus.icon';
import {Panel} from '../util/panel/Panel';

export const TablesOverview = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {wsm} = useWebSocket();
    const [games, setGames] = useState<Array<GameCreateResponseDto>>([]);
    const user = useRecoilValue(userState);
    const webSocketState = useRecoilValue(websocketState);

    useEffect(() => {
        const onGameUpdate: WsListener<GameCreateResponseDto[]> = (
            gamesList: GameCreateResponseDto[]
        ) => {
            setGames(gamesList);
        };

        wsm.registerListener(GameEvent.GAMES_UPDATE, onGameUpdate);

        if (webSocketState.connected) {
            setTimeout(() => {
                wsm.emit<void>({
                    event: GameEvent.GET_GAMES
                });
            }, 1);
        }

        return () => {
            wsm.removeListener(GameEvent.GET_GAMES, onGameUpdate);
        };
    }, [webSocketState]);

    const initialValues: CreateLobby = {
        creator: '',
        numberOfPlayers: 4,
        mode: GameMode.CLASSIC
    };

    const validationSchema = yup.object({
        numberOfPlayers: yup.number().min(2).max(5).required()
    });

    const handleCreateGame = (formValues: CreateLobby) => {
        if (!user) {
            navigate('/');
            return;
        }

        wsm.emit<GameCreateDto>({
            event: GameEvent.CREATE_GAME,
            data: {
                ...formValues,
                creator: user.uid
            }
        });
    };

    const handleJoinGame = (uid: string) => {
        // TODO: Show error message
        if (!user) return;

        wsm.emitWithAck<GameJoinDto>(
            {
                event: GameEvent.JOIN_REQUEST,
                data: {
                    gameUid: uid,
                    userUid: user.uid,
                    userName: user.username
                }
            },
            (success: boolean) => {
                if (!success) return;

                wsm.emit<GameJoinDto>({
                    event: GameEvent.JOIN_GAME,
                    data: {
                        gameUid: uid,
                        userUid: user.uid,
                        userName: user.username
                    }
                });

                navigate('/game');
            }
        );
    };

    return (
        <Panel>
            <div className="flex flex-col h-full">
                <div className="flex w-full justify-center font-title font-bold text-lg text-black dark:text-white pb-2">
                    {t('lobby.title')}
                </div>

                <div className="h-full content-start overflow-y-auto">
                    <div className="flex flex-col space-y-3">
                        {games.map((game: GameCreateResponseDto) => {
                            return (
                                <div
                                    key={game.uid}
                                    className="rounded-lg p-2 bg-the_game_gray_light"
                                >
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="font-bold">
                                            {game.mode === GameMode.CLASSIC
                                                ? t('game.mode.classic')
                                                : t('game.mode.onfire')}
                                        </p>
                                        <p>
                                            {game.connectedPlayers +
                                                ' / ' +
                                                game.numberOfPlayers}
                                        </p>
                                        <button
                                            className="rounded-md bg-the_game_orange hover:bg-the_game_darkOrange py-1 px-2 text-white font-bold"
                                            onClick={() =>
                                                handleJoinGame(game.uid)
                                            }
                                        >
                                            {t('lobby.join')}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="divider font-title font-bold text-black dark:text-white dark:before:bg-the_game_gray dark:after:bg-the_game_gray">
                    {t('lobby.createTable')}
                </div>

                <div className="flex w-full justify-center items-center space-x-10 text-black dark:text-white">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleCreateGame}
                        validationSchema={validationSchema}
                    >
                        <Form className="flex w-full justify-center items-center space-x-10">
                            <div>
                                <label htmlFor="numberOfPlayers">
                                    {t('lobby.numberOfPlayers') + ': '}
                                </label>
                                <Field
                                    className="text-center w-10 bg-transparent border-b-2 border-black dark:border-white"
                                    id={'numberOfPlayers'}
                                    type={'number'}
                                    name={'numberOfPlayers'}
                                    min={2}
                                    max={5}
                                />
                            </div>

                            <button
                                className="w-10 h-10 bg-the_game_purple rounded-full"
                                type="submit"
                            >
                                <PlusIcon />
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Panel>
    );
};
