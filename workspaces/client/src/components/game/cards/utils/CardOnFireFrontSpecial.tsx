import {useDrag} from 'react-dnd';
import {CardFrontProps} from './cardFrontProps.type';

export const CardOnFireFrontSpecial = (props: CardFrontProps) => {
    const [{isDragging}, drag] = useDrag(
        () => ({
            type: 'Card',
            item: {value: props.value},
            canDrag: props.canDrag,
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [props.value, props.canDrag]
    );

    return (
        <div
            ref={drag}
            className={`h-full w-max ${props.canDrag ? '!cursor-grab' : ''} ${
                isDragging ? '!cursor-grabbing' : ''
            }`}
        >
            <svg
                viewBox="0 0 240 370"
                fill="none"
                className={`${props.className} h-full ${
                    isDragging && 'opacity-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="240" height="370" rx="10" fill="black" />
                <g filter="url(#filter0_i_18_3788)">
                    <rect
                        x="8"
                        y="8"
                        width="224"
                        height="354"
                        rx="7"
                        fill="#202020"
                    />
                </g>
                <g opacity="0.4">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M103.837 42.0387C125.445 91.6084 62.4321 94.3111 68.8006 139.274C72.4219 164.82 106.954 180.824 128.089 201.26C145.162 217.77 155.034 235.153 157.736 263.246C148.397 268.103 129.347 268.103 120.007 263.246C119.024 198.911 51.6157 194.485 33.7647 145.354C37.4508 139.653 42.9319 152.149 48.5909 152.644C32.5029 93.6884 105.042 95.4964 103.834 42.0383L103.837 42.0387Z"
                        fill="url(#paint0_linear_18_3788)"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M102.49 104.024C96.1112 120.616 116.011 127.155 125.398 135.629C138.333 147.291 140.466 161.116 133.48 180.603C140.568 180.516 142.524 175.79 144.26 170.879C148.785 183.483 142.062 196.434 134.834 202.481C123.394 197.809 118.476 187.248 107.88 181.815C113.27 169.823 107.89 156.939 95.7515 153.86C100.104 150.807 109.841 153.264 113.27 155.077C115.519 138.356 86.4296 125.822 102.489 104.027L102.49 104.024Z"
                        fill="url(#paint1_linear_18_3788)"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.3734 162.368C32.1943 183.638 53.6731 188.98 55.328 212.207C58.9823 210.636 59.4126 206.167 59.3697 201.261C61.3789 226.205 47.3912 252.643 63.4106 271.761C69.2247 278.702 75.679 279.216 86.3186 285.13C108.872 285.256 123.935 296.53 148.305 291.208C123.92 333.049 46.9997 313.516 40.5091 271.761C35.5387 276.104 36.2698 285.314 37.8117 292.43C-0.636938 265.411 58.7162 220.671 32.4221 191.542C29.6825 181.821 25.6523 173.989 28.3714 162.364L28.3734 162.368Z"
                        fill="url(#paint2_linear_18_3788)"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M218.373 229.218C215.997 242.471 210.129 252.582 204.9 263.246C203.745 262.132 205.691 253.494 204.9 248.666C198.044 256.664 190.918 264.41 184.684 272.97C170.369 278.312 161.997 286.843 146.956 288.772C88.1078 296.332 41.1431 243.098 83.6215 204.903C92.6226 209.75 98.5923 217.331 105.181 224.36C66.9147 267.754 173.475 286.268 187.378 245.019C178.759 244.534 175.121 248.547 165.819 247.442C179.817 236.856 196.047 228.742 199.507 209.77C202.124 195.415 193.247 178.343 196.809 163.577C198.583 156.228 203.634 153.053 204.897 145.351C198.508 169.005 213.452 191.014 218.37 212.201V229.216L218.373 229.218Z"
                        fill="url(#paint3_linear_18_3788)"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M117.316 76.0725C120.283 73.4695 122.249 82.0976 126.742 82.1462C128.698 124.149 175.878 125.346 176.605 168.446C182.934 164.432 179.624 151.723 184.686 146.565C200.029 183.498 180.931 221.675 159.086 240.156C151.966 232.4 149.043 220.854 141.568 213.418C152.391 198.421 162.155 173.054 149.649 153.862C146.888 155.825 146.259 159.713 144.26 162.369C147.092 141.429 127.29 130.804 120.009 114.965C120.347 99.7243 124.899 87.1091 117.314 76.0736L117.316 76.0725Z"
                        fill="url(#paint4_linear_18_3788)"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M102.49 89.4351C100.759 105.732 74.4923 135.761 103.838 146.564C92.4842 148.285 82.2418 138.503 76.8885 130.762C75.5659 108.106 96.9602 105.926 102.492 89.4333L102.49 89.4351Z"
                        fill="url(#paint5_linear_18_3788)"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_i_18_3788"
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
                            result="effect1_innerShadow_18_3788"
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
                            values="0 0 0 0 0.74902 0 0 0 0 0.443137 0 0 0 0 0.376471 0 0 0 1 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_18_3788"
                        />
                    </filter>
                    <linearGradient
                        id="paint0_linear_18_3788"
                        x1="120.259"
                        y1="41.7082"
                        x2="121.194"
                        y2="372.311"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.4069" stopColor="#C87130" />
                        <stop offset="0.4793" stopColor="#D36C22" />
                        <stop offset="0.5273" stopColor="#D86A1D" />
                        <stop offset="1" stopColor="#B92518" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_18_3788"
                        x1="119.22"
                        y1="-130.49"
                        x2="121.186"
                        y2="624.521"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.729167" stopColor="#D86A1D" />
                        <stop offset="1" stopColor="#B92518" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_18_3788"
                        x1="119.729"
                        y1="-173.891"
                        x2="121.771"
                        y2="314.789"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.520833" stopColor="#D86A1D" />
                        <stop offset="1" stopColor="#B92518" />
                    </linearGradient>
                    <linearGradient
                        id="paint3_linear_18_3788"
                        x1="120.347"
                        y1="-154.065"
                        x2="123.121"
                        y2="361.63"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.5273" stopColor="#D86A1D" />
                        <stop offset="1" stopColor="#B92518" />
                    </linearGradient>
                    <linearGradient
                        id="paint4_linear_18_3788"
                        x1="120.405"
                        y1="-14.2974"
                        x2="121.432"
                        y2="437.396"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.4793" stopColor="#D36C22" />
                        <stop offset="0.5273" stopColor="#D86A1D" />
                        <stop offset="1" stopColor="#B92518" />
                    </linearGradient>
                    <linearGradient
                        id="paint5_linear_18_3788"
                        x1="89.9007"
                        y1="41.7847"
                        x2="90.8971"
                        y2="314.635"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.4793" stopColor="#D36C22" />
                        <stop offset="0.5273" stopColor="#D86A1D" />
                        <stop offset="1" stopColor="#B92518" />
                    </linearGradient>
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
