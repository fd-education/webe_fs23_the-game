import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {NewLobby} from '@the-game/common/dist/types/lobby/newLobby';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {PlusIcon} from '../svg/plus.icon';
import {Panel} from '../util/panel/Panel';

export const LobbyOverview = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const [lobbies, setLobbies] = useState<Array<NewLobby>>([]);

    useEffect(() => {
       const onNewLobbyCreated: WsListener<NewLobby> = (newLobby: NewLobby) => {
           setLobbies((currentLobbies: NewLobby[]) => {
               return [...currentLobbies, newLobby];
           });
       }

       wsm.registerListener(LobbyEvent.NEW_LOBBY, onNewLobbyCreated);

       return () => {
              wsm.removeListener(LobbyEvent.NEW_LOBBY, onNewLobbyCreated);
       }
    });
    
    const initialValues: CreateLobby = {
        numberOfPlayers: 4,
        mode: GameMode.CLASSIC
    };

    const validationSchema = yup.object({
        tableSize: yup.number().min(2).max(5).required()
    });

    const handleCreateTable = (formValues: CreateLobby) => {
        wsm.emit<CreateLobby>({
            event: LobbyEvent.CREATE_LOBBY,
            data: formValues
        })
    };

    return (
        <Panel>
            <div className="flex flex-col h-full w-full">
                <div className="flex w-full justify-center font-title font-bold text-lg text-black dark:text-white">
                    {t('lobby.title')}
                </div>

                <div className="flex-grow"></div>

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
                                <label htmlFor="tableSize">
                                    {t('lobby.numberOfPlayers') + ': '}
                                </label>
                                <Field
                                    className="text-center w-10 bg-transparent border-b-2 border-black dark:border-white"
                                    id={'tableSize'}
                                    type={'number'}
                                    name={'tableSize'}
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
