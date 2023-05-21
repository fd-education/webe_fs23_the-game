import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {PlayerTile} from './utils/PlayerTile';

type OtherPlayersRowProps = {
    players: {name: string; handCards: number[]}[];
    gameMode: GameMode;
};

export const OtherPlayersRow = (props: OtherPlayersRowProps) => {
    return (
        <div className="flex flex-row justify-around h-[19%] px-36">
            {props.players.map((player, index) => {
                return (
                    <PlayerTile
                        player={player}
                        gameMode={props.gameMode}
                        key={index}
                    />
                );
            })}
        </div>
    );
};
