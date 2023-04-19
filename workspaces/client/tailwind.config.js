module.exports = {
    content: [
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {
            colors: {
                primaryLight: '#F3E6E6',
                secondaryLight: '#FFFFFF',
                shadowLight: '#EFE0EF',

                primaryDark: '#3D3A3A',
                secondaryDark: '#3A3737',
                shadowDark: 'rgba(33,33,33,0.25)',

                the_game_purple: '#6B4EFF',
                the_game_darkPurple: '#6f65a0',

                the_game_orange: '#BF7160',
                the_game_darkOrange: '#814d41',
                the_game_gray: '#847C7C',

                chatBubbleForeign: '#262628',
                chatBubbleOwn: '#E9E9EB'
            },
            boxShadow: {
                around: '0 0 7px 11px theme(colors.shadowDark)'
            },
            borderRadius: {
                '2lg': '1rem'
            }
        }
    },
    variants: {},
    plugins: [require('daisyui')]
};
