import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';

type ReadyDialogueProps = {
    // TODO
    display: boolean;
    numberOfPlayers: number;
};

export const ReadyDialogue = (props: ReadyDialogueProps) => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const user = useRecoilValue(userState);

    const [ready, setReady] = useState<boolean>(false);
    const [numberOfReadyPlayers, setNumberOfReadyPlayers] = useState<number>(0);

    const handleReadyClick = () => {
        // TODO Send ready to server
        setReady(true);
    };

    return props.display ? (
        <div className="flex flex-col items-center p-8 rounded-2xl shadow dark:shadow-shadowDark shadow-shadowLight absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 bg-secondaryLight dark:bg-secondaryDark">
            <p className="font-title font-bold text-lg text-black dark:text-white">
                {t('game.ready_question')}
            </p>

            {!ready && (
                <button
                    className="p-5 bg-green-400 rounded-2xl mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handleReadyClick}
                    disabled={ready}
                >
                    {t('game.ready_button')}
                </button>
            )}

            {ready && (
                <p className="font-title font-bold text-lg text-green-400 mt-4">
                    {t('game.ready_message') +
                        ` (${numberOfReadyPlayers}/${props.numberOfPlayers})`}
                </p>
            )}
        </div>
    ) : (
        <></>
    );
};
