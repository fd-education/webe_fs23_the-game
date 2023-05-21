import {useTranslation} from 'react-i18next';

export const SmallTitle = () => {
    const {t} = useTranslation();

    return (
        <div className="font-title flex flex-col items-center text-black dark:text-white py-0 select-none">
            <p className="flex flex-row items-center py-0">
                <span className="text-5xl">THE</span>
                <span className="text-8xl font-extrabold leading-none py-0">
                    GAME
                </span>
            </p>
            <p className="text-xl">{t('common.subtitle')}</p>
        </div>
    );
};
