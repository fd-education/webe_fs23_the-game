module.exports = {
    content: [
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {
            colors: {
                primaryLight: "#F3E6E6",
                secondaryLight: "#FFFFFF",
                shadowLight: "#EFE0EF",

                primaryDark: "#3D3A3A",
                secondaryDark: "#3A3737",
                shadowDark: "#212121",


                chatBubbleForeign: "#262628",
                chatBubbleOwn: "#E9E9EB"
            }
        },
    },
    variants: {},
    plugins: [
        require('daisyui')
    ],
}