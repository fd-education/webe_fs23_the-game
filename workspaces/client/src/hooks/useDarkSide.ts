import React, {useEffect, useState} from 'react';

export default function useDarkSide(): [string, React.Dispatch<any>] {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}
