module.exports = {
    content: [
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        fontFamily: {
            'sans': ['Inter', 'sans-serif'],
            'title': ['Roboto Mono', 'monospace']
        },
        extend: {
            colors: {
                primaryLight: '#F3E6E6',
                secondaryLight: '#FFF8F8',
                shadowLight: 'rgba(239, 224, 239, 0.33)',

                primaryDark: '#3D3A3A',
                secondaryDark: 'rgba(58,55,55,0)',
                shadowDark: 'rgba(33,33,33,0)',

                the_game_purple: '#6B4EFF',
                the_game_darkPurple: '#6f65a0',

                the_game_orange: '#BF7160',
                the_game_darkOrange: '#814d41',
                the_game_gray: '#847C7C',
                the_game_gray_light: '#ABA7A7',

                chatBubbleForeign: '#262628',
                chatBubbleOwn: '#E9E9EB',
            },
            aspectRatio: {
              'card': '1 / 1.5',
            },
            backgroundImage: {
                'cards': "url('/public/svg/background-cards.svg')"
            },
            backgroundPosition: {
                'cards-background': '-10rem -45rem',
                'exp': 'center center',
            },
            backgroundSize: {
                '6': '4rem',
            },
            boxShadow: {
                'dark-around': '12px 12px 29px #2e2c2c, -12px -12px 29px #464242;',
                'light-around': '12px 12px 29px #e2d6d6, -12px -12px 29px #fff6f6;'
            },
            borderRadius: {
                '2lg': '1rem'
            },
            fontSize:{
                '10xl': '10rem',
            }
        }
    },
    daisyui: {
      themes: [
          {
              mytheme: {
                  "base-100": "#D9D9D9",
              }
          }
      ]
    },
    variants: {},
    darkMode: 'class',
    plugins: [require('daisyui'), require('@tailwindcss/aspect-ratio'),]
};
