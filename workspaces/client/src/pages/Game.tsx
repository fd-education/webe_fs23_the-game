import {FC} from 'react';
import {Chat} from '../components/chat/Chat';
import {GameOverview} from '../components/game-overview/GameOverview';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';

export const Game: FC = () => {
    return (
        <div className="flex flex-row bg-primaryLight dark:bg-primaryDark h-screen w-full">
            <div className="flex flex-col w-[25%] items-center h-screen p-8 space-y-8">
                <div className="flex-grow w-full">
                    <Chat />
                </div>

                <div className="flex flex-col items-center space-y-8">
                    <PreferenceToggles
                        togglesToDisplay={{
                            screenMode: true,
                            language: true,
                            home: true
                        }}
                    />
                </div>
            </div>

            <GameOverview />
        </div>
    );
};
