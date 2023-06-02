import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {useContext, useEffect, useState} from 'react';
import {GameContext} from '../../../../pages/Game';
import {UserTag} from '../../../util/misc/UserTag';
import {Card} from '../../cards/Card';

type PlayerTileProps = {
    player: {name: string; handCards: number[]};
};

export const PlayerTile = (props: PlayerTileProps) => {
    return (
        <div className="flex flex-col justify-center p-2 space-y-4 w-[30%] bg-the_game_gray_light rounded-3xl">
            <div className="space-x-2 flex flex-row justify-center items-center">
                <UserTag username={props.player.name} />
                <p className="font-medium">{props.player.name}</p>
            </div>
            <div className="flex flex-row space-x-1 justify-around max-h-28">
                {props.player.handCards.map((card, index) => {
                    return (
                        <Card
                            value={card}
                            isFlipped={false}
                            canDrag={false}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};
