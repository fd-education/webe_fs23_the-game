import {Player} from '@the-game/common/dist/types/game/GameState';
import {useContext, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import {GameContext} from '../../../pages/Game';
import {PlayerTile} from './utils/PlayerTile';

export const OtherPlayersRow = () => {
    const gameContext = useContext(GameContext);
    const user = useRecoilValue(userState);

    const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
    const [activePlayer, setActivePlayer] = useState<string>('');

    useEffect(() => {
        if (!gameContext) return;
        if (!user) return;

        const otherPlayers = gameContext.players.filter(
            (p) => p.playerId !== user.uid
        );

        setActivePlayer(gameContext.playerAtTurn);
        setOtherPlayers(otherPlayers);
    }, [gameContext]);

    return (
        <div className="flex flex-row justify-around h-[19%] px-36">
            {otherPlayers.map((player, index) => {
                return (
                    <PlayerTile
                        player={player}
                        active={activePlayer}
                        key={index}
                    />
                );
            })}
        </div>
    );
};
