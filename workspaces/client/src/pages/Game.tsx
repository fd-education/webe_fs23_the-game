import {FC} from 'react';
import {Chat} from '../components/chat/Chat';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';

export const Game: FC = () => {
    return (
        <div className="flex flex-row bg-primaryLight dark:bg-primaryDark h-screen w-full">
            <div className="flex flex-col items-center h-screen p-8 space-y-4">
                <div className="flex-grow w-full">
                    <Chat />
                </div>

                <div className="flex flex-col items-center space-y-8">
                    <PreferenceToggles
                        togglesToDisplay={{screenMode: true, language: true}}
                    />
                </div>
            </div>

            <div className="h-full">
                <p>GAME</p>
            </div>
        </div>
    );
};
