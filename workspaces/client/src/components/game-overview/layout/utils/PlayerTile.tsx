import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {UserTag} from '../../../util/misc/UserTag';
import {Card} from '../../cards/Card';

type PlayerTileProps = {
    player: {name: string; handCards: number[]};
    gameMode: GameMode;
};

export const PlayerTile = (props: PlayerTileProps) => {
    return (
        <div className="flex flex-col w-[30%] bg-the_game_gray_light rounded-3xl">
            <div className="h-[30%] space-x-4 flex flex-row justify-center items-center">
                <UserTag username={props.player.name} />
                <p className="font-medium">{props.player.name}</p>
            </div>
            <div className="flex flex-row px-4 py-4 space-x-1 justify-around">
                {props.player.handCards.map((card, index) => {
                    return (
                        <Card
                            gameMode={props.gameMode}
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
