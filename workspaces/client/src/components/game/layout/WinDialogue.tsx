import {useTranslation} from 'react-i18next';
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti';
import {BackToLobbyButton} from './utils/BackToLobbyButton';

export const WinDialogue = () => {
    const {t} = useTranslation();
    const {height, width} = useWindowSize();

    return (
        <>
            <Confetti height={height} width={width} />
            <div className="flex flex-col items-center p-8 rounded-2xl space-y-5 dark:shadow-dark-around shadow-light-around absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 bg-secondaryLight dark:bg-secondaryDark">
                <p className="font-sans font-bold text-3xl text-black dark:text-white">
                    🥳 {t('game.congrats')} 🥳
                </p>
                <p className="font-title font-bold text-lg text-black dark:text-white">
                    {t('game.winMessage')}
                </p>
                <BackToLobbyButton />
            </div>
        </>
    );
};
