import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameCreateResponseDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameDeleteDto} from '@the-game/common/dist/types/game/GameDeleteDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import gameidState from '../../../common/states/gameid.state';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';
import {TrashIcon} from '../../svg/trash.icon';

type TableTileProps = {
    game: GameCreateResponseDto;
};

export const TableTile = (props: TableTileProps) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const user = useRecoilValue(userState);
    const setGameId = useSetRecoilState(gameidState);

    const game = props.game;

    const handleJoinGame = (uid: string) => {
        if (!user) return;

        wsm.emitWithAck<GameJoinDto>(
            {
                event: GameEvent.JOIN_GAME,
                data: {
                    gameUid: uid,
                    userUid: user.uid,
                    userName: user.username
                }
            },
            (success: boolean) => {
                if (!success) return;

                setGameId(uid);
                navigate('/game');
            }
        );
    };

    const handleDeleteLobby = (uid: string) => {
        if (!user) return;

        wsm.emit<GameDeleteDto>({
            event: GameEvent.DELETE_GAME,
            data: {
                gameUid: uid,
                userUid: user.uid
            }
        });
    };

    return (
        <div
            key={game.uid}
            className={`rounded-lg p-2 ${
                user && game.connectedPlayers.includes(user.uid)
                    ? 'bg-green-200'
                    : 'bg-the_game_gray_light'
            } `}
        >
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold">
                    {game.mode === GameMode.CLASSIC
                        ? t('game.mode.classic')
                        : t('game.mode.onfire')}
                </p>
                <p>
                    {game.connectedPlayers.length +
                        ' / ' +
                        game.numberOfPlayers}
                </p>

                <div className="flex flex-row space-x-4 mx-2">
                    {(!game.started ||
                        (user &&
                            game.started &&
                            game.connectedPlayers.includes(user.uid))) && (
                        <button
                            className="rounded-md bg-the_game_orange hover:bg-the_game_darkOrange py-1 px-2 text-white font-bold"
                            onClick={() => handleJoinGame(game.uid)}
                        >
                            {t('lobby.join')}
                        </button>
                    )}

                    {game.creator === user?.uid && (
                        <button onClick={() => handleDeleteLobby(game.uid)}>
                            <TrashIcon />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
