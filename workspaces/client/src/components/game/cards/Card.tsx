import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {useContext, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import {GameContext} from '../../../pages/Game';
import {CardFrontProps} from './utils/cardFrontProps.type';
import {ClassicCard} from './ClassicCard';
import {OnFireCard} from './OnFireCard';

export const Card = (props: CardFrontProps) => {
    const gameContext = useContext(GameContext);
    const user = useRecoilValue(userState);

    const [gameMode, setGameMode] = useState<GameMode>();
    const [isAtTurn, setIsAtTurn] = useState<boolean>(false);

    useEffect(() => {
        if (!gameContext) return;
        if (!user) return;

        setIsAtTurn(user.uid === gameContext.playerAtTurn);
        setGameMode(gameContext.gameMode);
    }, [gameContext]);

    return gameMode === GameMode.CLASSIC ? (
        <ClassicCard {...props} canDrag={isAtTurn} />
    ) : (
        <OnFireCard {...props} canDrag={isAtTurn} />
    );
};
