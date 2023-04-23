import {useTranslation} from 'react-i18next';

export const RulesButton = () => {
    const {t} = useTranslation();

    return (
        <button
            className={
                'w-72 btn bg-the_game_orange border-none hover:bg-the_game_darkOrange text-white rounded-full'
            }
        >
            {t('common.readRules')}
        </button>
    );
};
