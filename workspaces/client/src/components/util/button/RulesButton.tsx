import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RulesPopup} from '../../rules/RulesPopup';

export const RulesButton = () => {
    const {t} = useTranslation();

    const [rulesShowing, setRulesShowing] = useState<boolean>(false);

    return (
        <>
            {rulesShowing && (
                <RulesPopup onClose={() => setRulesShowing(false)} />
            )}

            <button
                className={
                    'w-72 btn bg-the_game_orange border-none hover:bg-the_game_darkOrange text-white rounded-full'
                }
                onClick={() => setRulesShowing(true)}
            >
                {t('common.readRules')}
            </button>
        </>
    );
};
