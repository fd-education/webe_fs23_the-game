import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import {useEffect, useState} from 'react';
import {WsListener} from '../../../../common/websocket/websocket.manager';
import useWebSocket from '../../../../hooks/useWebSocket';

type StopIconProps = {
    stackIndex: number;
};

export const StopIcon = (props: StopIconProps) => {
    const {wsm} = useWebSocket();
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        const onBlockIntervention: WsListener<GameInterventionDto> = (
            intervention: GameInterventionDto
        ) => {
            if (intervention.stackIndex !== props.stackIndex) return;
            setAnimation(true);
        };

        wsm.registerListener(GameEvent.BLOCK_INTERVENTION, onBlockIntervention);

        return () => {
            wsm.removeListener(
                GameEvent.BLOCK_INTERVENTION,
                onBlockIntervention
            );
        };
    });

    return (
        <svg
            viewBox="0 0 131 131"
            fill="none"
            className={`h-full m-auto p-0.5 dark:fill-white fill-black ${
                animation && 'animate-grow'
            }`}
            onAnimationEnd={() => setAnimation(false)}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_320_7950)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M40.0614 0C38.9778 0.000230224 37.9385 0.430098 37.1712 1.19537L1.19537 37.1712C0.430098 37.9385 0.000230224 38.9778 0 40.0614L0 90.9386C0.000230224 92.0222 0.430098 93.0615 1.19537 93.8288L37.1712 129.805C37.9385 130.57 38.9778 131 40.0614 131H90.9386C92.0222 131 93.0615 130.57 93.8288 129.805L129.805 93.8288C130.57 93.0615 131 92.0222 131 90.9386V40.0614C131 38.9778 130.57 37.9385 129.805 37.1712L93.8288 1.19537C93.0615 0.430098 92.0222 0.000230224 90.9386 0L40.0614 0ZM8.1875 41.7562L41.7562 8.1875H89.2437L122.812 41.7562V89.2437L89.2437 122.812H41.7562L8.1875 89.2437V41.7562Z"
                />
                <path d="M90.0831 28.0415C87.5418 28.0415 85.4807 30.1023 85.4807 32.6438V61.5133H81.6679V23.7186C81.6679 21.1771 79.6068 19.1163 77.0655 19.1163C74.524 19.1163 72.4632 21.1771 72.4632 23.7186V61.5131H68.652V22.6023C68.6518 20.0608 66.5908 18 64.0494 18C61.5079 18 59.4471 20.0608 59.4471 22.6023V61.5133H55.0785V31.5292C55.0785 28.9877 53.0175 26.9269 50.4762 26.9269C47.9347 26.9269 45.8738 28.9877 45.8738 31.5292V66.1154V72.2524C45.8935 72.4255 45.7235 72.9616 45.3965 73.2934C45.2413 73.4634 45.0713 73.5827 44.9243 73.6514C44.7723 73.7184 44.6513 73.7494 44.4814 73.7511C44.3292 73.7494 44.1282 73.7265 43.8064 73.5991C43.3309 73.4078 42.5693 72.9469 41.6196 71.8992C40.6733 70.8565 39.5653 69.2385 38.444 66.908C35.8354 61.5048 34.0656 58.6316 32.6943 56.8582C31.9996 55.9707 31.4048 55.3449 30.7119 54.817C30.3638 54.5539 29.9845 54.3169 29.5351 54.1192C29.0889 53.9231 28.5642 53.7678 27.9874 53.7204C26.5638 53.6011 25.1797 54.1405 24.2119 55.1947C23.246 56.2472 22.826 57.6725 23.0663 59.081C23.1364 59.4733 23.4159 60.8953 24.7594 64.7328C26.1028 68.5653 28.5168 74.8003 32.8755 84.7047C36.2522 92.36 41.3758 99.0265 47.3297 103.913C50.3109 106.355 53.5077 108.35 56.8483 109.763C60.1857 111.171 63.6799 111.998 67.2119 112C72.1639 112.008 76.5505 110.732 80.1479 108.646C82.8495 107.085 85.1097 105.095 86.9647 102.924C89.7464 99.6623 91.6374 96.0043 92.868 92.5168C94.0937 89.0127 94.6772 85.708 94.6852 82.8511C94.6852 82.3998 94.6852 82.0339 94.6852 81.7349C94.6852 80.9241 94.6852 80.6217 94.6852 80.6186V32.6438C94.6854 30.1023 92.6246 28.0415 90.0831 28.0415Z" />
            </g>
            <defs>
                <clipPath id="clip0_320_7950">
                    <rect width="131" height="131" />
                </clipPath>
            </defs>
        </svg>
    );
};
