import {useTranslation} from 'react-i18next';
import {PickUpStackProps} from './pickUpStackProps.type';

export const PickUpStackClassic = (props: PickUpStackProps) => {
    const {t} = useTranslation();

    return (
        <svg
            viewBox="0 0 241 370"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
            className={props.className}
        >
            <g clipPath="url(#clip0_325_4534)">
                <g clipPath="url(#clip1_325_4534)">
                    <rect x="1" width="240" height="370" rx="10" fill="black" />
                    <g filter="url(#filter0_f_325_4534)">
                        <path
                            d="M85 249L115.048 267.373C118.597 269.542 124.403 269.542 127.952 267.373L158 249"
                            stroke="#988ED7"
                            strokeWidth="25.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M82 199L114.518 222.884C118.358 225.705 124.642 225.705 128.482 222.884L161 199"
                            stroke="#988ED7"
                            strokeWidth="25.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M92 296L116.285 308.861C119.153 310.38 123.847 310.38 126.715 308.861L151 296"
                            stroke="#988ED7"
                            strokeWidth="25.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <g filter="url(#filter1_f_325_4534)">
                        <path
                            d="M158 112L127.952 93.6273C124.403 91.4576 118.597 91.4576 115.048 93.6273L85 112"
                            stroke="#988ED7"
                            strokeWidth="25.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M161 162L128.482 138.116C124.642 135.295 118.358 135.295 114.518 138.116L82 162"
                            stroke="#988ED7"
                            strokeWidth="25.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M151 65L126.715 52.1391C123.847 50.6203 119.153 50.6203 116.285 52.1391L92 65"
                            stroke="#988ED7"
                            strokeWidth="25.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <path
                        d="M62.7461 230.529C61.9551 231.496 60.8711 232.478 59.4941 233.474C58.1172 234.47 56.4912 235.363 54.6162 236.154C52.7119 236.975 50.5879 237.634 48.2441 238.132C45.9004 238.63 43.3809 238.879 40.6855 238.879C38.3418 238.879 36.1299 238.601 34.0498 238.044C31.999 237.517 30.1094 236.74 28.3809 235.715C26.6816 234.66 25.1289 233.371 23.7227 231.848C22.3457 230.324 21.1738 228.581 20.207 226.618C19.0938 224.45 18.2441 222.004 17.6582 219.279C17.1016 216.555 16.8232 213.596 16.8232 210.402V201.701C16.8232 198.654 17.1016 195.827 17.6582 193.22C18.2148 190.583 19.0059 188.195 20.0312 186.057C20.998 184.152 22.1113 182.438 23.3711 180.915C24.6602 179.392 26.0664 178.073 27.5898 176.96C29.377 175.7 31.3252 174.748 33.4346 174.104C35.5439 173.459 37.7705 173.137 40.1143 173.137C43.7178 173.137 46.8525 173.591 49.5186 174.499C52.2139 175.407 54.4844 176.711 56.3301 178.41C58.1758 180.139 59.6113 182.233 60.6367 184.694C61.6914 187.155 62.3799 189.924 62.7021 193H50.6611C50.4561 191.447 50.1338 190.07 49.6943 188.869C49.2842 187.668 48.7129 186.657 47.9805 185.837C47.1602 184.929 46.1201 184.255 44.8604 183.815C43.6299 183.347 42.1504 183.112 40.4219 183.112C39.4844 183.112 38.5762 183.259 37.6973 183.552C36.8184 183.845 35.998 184.27 35.2363 184.826C34.2402 185.588 33.332 186.584 32.5117 187.814C31.7207 189.045 31.0615 190.495 30.5342 192.165C30.124 193.454 29.8018 194.89 29.5674 196.472C29.3623 198.054 29.2598 199.768 29.2598 201.613V210.402C29.2598 212.717 29.4062 214.826 29.6992 216.73C30.0215 218.635 30.4609 220.319 31.0176 221.784C31.3691 222.634 31.7646 223.425 32.2041 224.157C32.6729 224.86 33.1855 225.49 33.7422 226.047C34.6797 226.984 35.7637 227.702 36.9941 228.2C38.2539 228.669 39.6748 228.918 41.2568 228.947C42.2236 228.947 43.1758 228.874 44.1133 228.728C45.0508 228.581 45.9297 228.376 46.75 228.112C47.5703 227.849 48.2881 227.556 48.9033 227.233C49.5479 226.882 50.0312 226.516 50.3535 226.135L50.3975 214.533H39.8066V205.305H62.7021L62.7461 230.529ZM104.274 224.641H85.0703L81.291 238H68.2832L89.2451 174.016H100.451L121.018 238H108.01L104.274 224.641ZM88.1025 214.138H101.374L94.8262 190.583L88.1025 214.138ZM142.023 174.016L148.088 198.054L154.987 174.016H170.324V238H158.986V219.06L159.514 189.133L151.12 216.906H145.012L137.497 190.319L138.024 219.06V238H126.687V174.016H142.023ZM220.29 209.963H194.011V228.024H224.729V238H181.618V174.016H224.597V184.079H194.011V200.207H220.29V209.963Z"
                        fill="white"
                    />
                    <path
                        d="M105.094 127.578H94.5469V158H90.3281V127.578H79.7812V123.875H105.094V127.578ZM132.305 158H128.203V142.227H114.211V158H110.133V123.875H114.211V138.547H128.203V123.875H132.305V158ZM158.508 142.227H144.258V154.32H160.875V158H139.922V123.875H160.664V127.578H144.258V138.547H158.508V142.227Z"
                        fill="white"
                    />
                </g>
                <rect
                    width="240"
                    height="370"
                    rx="10"
                    fill="#9F9F9F"
                    fillOpacity="0"
                />
                <rect
                    x="1.5"
                    y="1.5"
                    width="237"
                    height="367"
                    rx="8.5"
                    stroke="#9F9F9F"
                    strokeWidth="3"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_325_4534"
                    x="-10.8008"
                    y="106.199"
                    width="264.602"
                    height="296.601"
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
                    <feGaussianBlur
                        stdDeviation="40"
                        result="effect1_foregroundBlur_325_4534"
                    />
                </filter>
                <filter
                    id="filter1_f_325_4534"
                    x="-10.8008"
                    y="-41.7998"
                    width="264.602"
                    height="296.601"
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
                    <feGaussianBlur
                        stdDeviation="40"
                        result="effect1_foregroundBlur_325_4534"
                    />
                </filter>
                <clipPath id="clip0_325_4534">
                    <rect width="241" height="370" fill="white" />
                </clipPath>
                <clipPath id="clip1_325_4534">
                    <rect
                        width="240"
                        height="370"
                        fill="white"
                        transform="translate(1)"
                    />
                </clipPath>
            </defs>
            <text
                fontSize="35"
                x="50%"
                y="20%"
                fill="#FFFFFF"
                fontFamily="Impact, sans-serif"
                dominantBaseline="middle"
                textAnchor="middle"
                className={'select-none'}
            >
                {t('game.endRound')}
            </text>
            <text
                fontSize="35"
                x="50%"
                y="80%"
                fill="#FFFFFF"
                fontFamily="Impact, sans-serif"
                dominantBaseline="middle"
                textAnchor="middle"
                className={'select-none'}
            >
                {`${props.cardsOnStack} ${t('game.pickupCardsRemaining')}`}
            </text>
        </svg>
    );
};
