import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameCreateDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {Field, Form, Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';
import {PlusIcon} from '../../svg/plus.icon';
import * as yup from 'yup';

export const CreateTableForm = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const user = useRecoilValue(userState);

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

    return (
        <>
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

                        <div>
                            <label htmlFor="mode">
                                {t('lobby.mode') + ': '}
                            </label>
                            <Field
                                as="select"
                                name="mode"
                                className="text-center bg-transparent border-b-2 border-black dark:border-white"
                            >
                                <option selected value={GameMode.CLASSIC}>
                                    {t('game.mode.classic')}
                                </option>
                                <option value={GameMode.ONFIRE}>
                                    {t('game.mode.onfire')}
                                </option>
                            </Field>
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
        </>
    );
};
