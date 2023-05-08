import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../svg/plus.icon';
import {Panel} from '../util/panel/Panel';

export const LobbyOverview = () => {
    const {t} = useTranslation();

    const initialValues = {
        tableSize: 4
    };

    const validationSchema = yup.object({
        tableSize: yup.number().min(2).max(5).required()
    });

    const handleCreateTable = () => {
        console.log('create table');
    };

    return (
        <Panel>
            <div className="flex flex-col h-full w-full">
                <div className="flex w-full justify-center font-title font-bold text-lg text-black dark:text-white">
                    {t('lobby.title')}
                </div>

                <div className="flex-grow"></div>

                <div className="divider font-title font-bold text-black dark:text-white">
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
