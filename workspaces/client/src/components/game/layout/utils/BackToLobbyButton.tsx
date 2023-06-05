import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

export const BackToLobbyButton = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleBackToLobbyClick = () => {
        navigate('/lobby');
    };

    return (
        <button
            className="p-5 bg-green-400 rounded-2xl mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleBackToLobbyClick}
        >
            {t('game.backToLobby')}
        </button>
    );
};
