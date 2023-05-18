import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {Lobby} from '@the-game/common/dist/types/lobby/lobby';
import {NewLobby} from '@the-game/common/dist/types/lobby/newLobby';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import UserRepository from '../../common/localstorage/user.repository';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {PlusIcon} from '../svg/plus.icon';
import {Panel} from '../util/panel/Panel';

export const LobbyOverview = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const [lobbies, setLobbies] = useState<Array<Lobby>>([]);

    useEffect(() => {
        const onNewLobbyCreated: WsListener<Lobby> = (lobby: Lobby) => {
            setLobbies((currentLobbies: Lobby[]) => {
                return [...currentLobbies, lobby];
            });
        };

        const onUpdateLobby: WsListener<Lobby> = (lobby: Lobby) => {
            setLobbies((currentLobbies: Lobby[]) => {
                const index = currentLobbies.findIndex(
                    (currentLobby: NewLobby) => currentLobby.uid === lobby.uid
                );

                if (index === -1) return currentLobbies;

                const newLobbies = [...currentLobbies];
                newLobbies[index] = {...newLobbies[index], ...lobby};

                return newLobbies;
            });
        };

        wsm.registerListener(LobbyEvent.NEW_LOBBY, onNewLobbyCreated);

        wsm.registerListener(LobbyEvent.UPDATE_LOBBY, onUpdateLobby);

        return () => {
            wsm.removeListener(LobbyEvent.NEW_LOBBY, onNewLobbyCreated);
        };
    });

    const initialValues: CreateLobby = {
        creator: '',
        numberOfPlayers: 4,
        mode: GameMode.CLASSIC
    };

    const validationSchema = yup.object({
        numberOfPlayers: yup.number().min(2).max(5).required()
    });

    const handleCreateTable = (formValues: CreateLobby) => {
        const userUid = UserRepository.getUserId();

        // TODO: Show error message
        if (!userUid) return;

        wsm.emit<CreateLobby>({
            event: LobbyEvent.CREATE_LOBBY,
            data: {
                ...formValues,
                creator: userUid
            }
        });
    };

    const handleJoinLobby = (uid: string) => {
        const userUid = UserRepository.getUserId();

        // TODO: Show error message
        if (!userUid) return;

        wsm.emit<JoinLobby>({
            event: LobbyEvent.JOIN_LOBBY,
            data: {
                user_uid: userUid,
                lobby_uid: uid
            }
        });
    };

    return (
        <Panel>
            <div className="flex flex-col h-full">
                <div className="flex w-full justify-center font-title font-bold text-lg text-black dark:text-white pb-2">
                    {t('lobby.title')}
                </div>

                <div className="h-full content-start overflow-y-auto">
                    <div className="flex flex-col space-y-3">
                        {lobbies.map((lobby: Lobby) => {
                            return (
                                <div
                                    key={lobby.uid}
                                    className="rounded-lg p-2 bg-the_game_gray_light"
                                >
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="font-bold">
                                            {lobby.mode === GameMode.CLASSIC
                                                ? t('game.mode.classic')
                                                : t('game.mode.onfire')}
                                        </p>
                                        <p>
                                            {lobby.players.length +
                                                ' / ' +
                                                lobby.numberOfPlayers}
                                        </p>
                                        <button
                                            className="rounded-md bg-the_game_orange hover:bg-the_game_darkOrange py-1 px-2 text-white font-bold"
                                            onClick={() =>
                                                handleJoinLobby(lobby.uid)
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
                        onSubmit={handleCreateTable}
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
