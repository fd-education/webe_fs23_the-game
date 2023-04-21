import {useTranslation} from 'react-i18next';

export const BigTitle = () => {
    const {t} = useTranslation();

    return (
        <div className="font-title flex flex-col items-center text-black dark:text-white">
            <p className="flex flex-row items-center">
                <span className="text-6xl">THE</span>
                <span className="text-9xl font-extrabold">GAME</span>
            </p>
            <p className="text-2xl">{t('common.subtitle')}</p>
        </div>
    );
};
