import React, {FC} from 'react';
import {GameChat} from '../components/chat/GameChat';
import {GameOverview} from '../components/game-overview/GameOverview';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';

export const Game: FC = () => {
    return (
        <div className="flex flex-row bg-primaryLight dark:bg-primaryDark h-screen w-full">
            <div className="flex flex-col justify-between w-[25%] items-center h-screen py-8 pl-8 space-y-8">
                <div className="h-[90%] w-full">
                    <GameChat />
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
