import {useTranslation} from 'react-i18next';

export const BigTitle = () => {
    const {t} = useTranslation();

    return (
        <div className="font-title flex flex-col items-center text-black dark:text-white select-none">
            <p className="flex flex-row items-center">
                <span className="text-7xl">THE</span>
                <span className="text-10xl font-extrabold leading-none">
                    GAME
                </span>
            </p>
            <p className="text-3xl">{t('common.subtitle')}</p>
        </div>
    );
};
