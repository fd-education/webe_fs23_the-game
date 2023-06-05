import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useWebSocket from '../../../hooks/useWebSocket';
import {GameContext} from '../../../pages/Game';

export const StartDialogue = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const gameContext = useContext(GameContext);

    const [ready, setReady] = useState<boolean>(false);

    const handleStartClick = () => {
        wsm.emit<{gameId: string}>({
            event: GameEvent.START_GAME,
            data: {
                gameId: gameContext.gameId
            }
        });

        setReady(true);
    };

    return (
        <div className="flex flex-col items-center p-8 rounded-2xl dark:shadow-dark-around shadow-light-around absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 bg-secondaryLight dark:bg-secondaryDark">
            <p className="font-title font-bold text-lg text-black dark:text-white">
                {t('game.start_question')}
            </p>

            {!ready && (
                <button
                    className="p-5 bg-green-400 rounded-2xl mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handleStartClick}
                    disabled={ready}
                >
                    {t('game.start')}
                </button>
            )}

            {ready && (
                <p className="font-title font-bold text-lg text-green-400 mt-4">
                    {t('game.starting') + ' ...'}
                </p>
            )}
        </div>
    );
};
