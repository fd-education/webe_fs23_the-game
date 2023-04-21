import {useState} from 'react';
import useDarkSide from '../../../hooks/useDarkSide';

interface TogglesToDisplay {
    screenMode?: boolean;
    language?: boolean;
}

interface PreferenceTogglesProps {
    togglesToDisplay: TogglesToDisplay;
}

export const PreferenceToggles = (props: PreferenceTogglesProps) => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light');

    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div className="flex flex-row h-max space-x-10">
            {props.togglesToDisplay.screenMode && (
                <div className="bg-secondaryLight dark:bg-secondaryDark shadow-around p-0.5 rounded-xl w-max">
                    <label className="flex flex-row justify-center items-center">
                        <i className="bi bi-brightness-high-fill text-black dark:text-white icon-size-m px-2"></i>
                        <input
                            type="checkbox"
                            checked={darkSide}
                            onChange={(e) => toggleDarkMode(e.target.checked)}
                            className="toggle toggle-md border-none bg-the_game_orange"
                        />
                        <i className="bi bi-moon-stars-fill text-black dark:text-white icon-size-m px-2"></i>
                    </label>
                </div>
            )}

            {props.togglesToDisplay.language && (
                <div className="bg-secondaryLight dark:bg-secondaryDark shadow-around p-0.5 rounded-xl w-max">
                    <label className="flex flex-row justify-center items-center">
                        <p className="font-bold text-black dark:text-white icon-size-m px-2">
                            DE
                        </p>
                        <input
                            type="checkbox"
                            className="toggle toggle-md border-none bg-the_game_orange"
                        />
                        <p className="font-bold text-black dark:text-white icon-size-m px-2">
                            EN
                        </p>
                    </label>
                </div>
            )}
        </div>
    );
};
