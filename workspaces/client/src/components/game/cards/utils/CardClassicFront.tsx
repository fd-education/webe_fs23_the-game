import {useDrag} from 'react-dnd';
import {CardFrontProps} from './cardFrontProps.type';

export const CardClassicFront = (props: CardFrontProps) => {
    const [{isDragging}, drag] = useDrag(
        () => ({
            type: 'Card',
            item: {value: props.value},
            canDrag: props.canDrag,
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [props]
    );

    return (
        <div
            ref={drag}
            className={`h-full ${props.canDrag ? '!cursor-grab' : ''} ${
                isDragging ? '!cursor-grabbing' : ''
            }`}
        >
            <svg
                viewBox="0 0 240 370"
                fill="none"
                className={`${props.className} h-full w-full ${
                    isDragging && 'opacity-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="240" height="370" rx="10" fill="black" />
                <g filter="url(#filter0_i_15_3439)">
                    <rect
                        x="8"
                        y="8"
                        width="224"
                        height="354"
                        rx="7"
                        fill="#202020"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_i_15_3439"
                        x="8"
                        y="8"
                        width="224"
                        height="354"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feMorphology
                            radius="4"
                            operator="erode"
                            in="SourceAlpha"
                            result="effect1_innerShadow_15_3439"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                        />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.596078 0 0 0 0 0.556863 0 0 0 0 0.843137 0 0 0 1 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_15_3439"
                        />
                    </filter>
                </defs>
                <text
                    fontSize="50"
                    x="20%"
                    y="15%"
                    fill="#FFFFFF"
                    fontFamily="Impact, sans-serif"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={'select-none'}
                >
                    {props.value}
                </text>
                <text
                    fontSize="50"
                    x="80%"
                    y="15%"
                    fill="#FFFFFF"
                    fontFamily="Impact, sans-serif"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={'select-none'}
                >
                    {props.value}
                </text>
                <text
                    fontSize="50"
                    x="20%"
                    y="85%"
                    fill="#FFFFFF"
                    fontFamily="Impact, sans-serif"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={'select-none'}
                >
                    {props.value}
                </text>
                <text
                    fontSize="50"
                    x="80%"
                    y="85%"
                    fill="#FFFFFF"
                    fontFamily="Impact, sans-serif"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={'select-none'}
                >
                    {props.value}
                </text>
                <text
                    fontSize="160"
                    x="50%"
                    y="50%"
                    fill="#FFFFFF"
                    fontFamily="Impact, sans-serif"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={'select-none'}
                >
                    {props.value}
                </text>
            </svg>
        </div>
    );
};
