import {Player} from '@the-game/common/dist/types/game/GameState';
import {UserTag} from '../../../util/misc/UserTag';
import {Card} from '../../cards/Card';

type PlayerTileProps = {
    player: Player;
    active: string;
};

export const PlayerTile = (props: PlayerTileProps) => {
    return (
        <div
            className={`flex flex-col ${
                props.player.playerId === props.active
                    ? 'bg-green-200'
                    : 'bg-the_game_gray_light'
            } justify-center p-2 space-y-4 w-[30%] rounded-3xl`}
        >
            <div className="space-x-2 flex flex-row justify-center items-center">
                <UserTag username={props.player.name} />
                <p className="font-medium">{props.player.name}</p>
            </div>
            <div className="flex flex-row justify-center space-x-1 h-16">
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
