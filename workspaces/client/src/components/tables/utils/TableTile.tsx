import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameCreateResponseDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import gameidState from '../../../common/states/gameid.state';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';

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
        // TODO: Show error message
        if (!user) return;

        wsm.emitWithAck<GameJoinDto>(
            {
                event: GameEvent.JOIN_REQUEST,
                data: {
                    gameUid: uid,
                    userUid: user.uid,
                    userName: user.username
                }
            },
            (success: boolean) => {
                if (!success) return;

                wsm.emit<GameJoinDto>({
                    event: GameEvent.JOIN_GAME,
                    data: {
                        gameUid: uid,
                        userUid: user.uid,
                        userName: user.username
                    }
                });

                setGameId(uid);
                navigate('/game');
            }
        );
    };

    return (
        <div key={game.uid} className="rounded-lg p-2 bg-the_game_gray_light">
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold">
                    {game.mode === GameMode.CLASSIC
                        ? t('game.mode.classic')
                        : t('game.mode.onfire')}
                </p>
                <p>{game.connectedPlayers + ' / ' + game.numberOfPlayers}</p>
                <button
                    className="rounded-md bg-the_game_orange hover:bg-the_game_darkOrange py-1 px-2 text-white font-bold"
                    onClick={() => handleJoinGame(game.uid)}
                >
                    {t('lobby.join')}
                </button>
            </div>
        </div>
    );
};
