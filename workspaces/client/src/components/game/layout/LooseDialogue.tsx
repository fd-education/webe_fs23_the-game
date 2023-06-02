import {useTranslation} from 'react-i18next';
import {BackToLobbyButton} from './utils/BackToLobbyButton';

export const LooseDialogue = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className="flex flex-col items-center p-8 rounded-2xl space-y-5 dark:shadow-dark-around shadow-light-around absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 bg-secondaryLight dark:bg-secondaryDark">
                <p className="font-sans font-bold text-3xl text-black dark:text-white">
                    😢 {t('game.loose')} 😢
                </p>
                <p className="font-title font-bold text-lg text-black dark:text-white">
                    {t('game.looseMessage')}
                </p>
                <BackToLobbyButton />
            </div>
        </>
    );
};
