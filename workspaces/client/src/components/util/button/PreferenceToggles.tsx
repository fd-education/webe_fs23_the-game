import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Lang} from '../../../common/enum/lang.enum';
import {Theme} from '../../../common/enum/theme.enum';
import useSwitchLang from '../../../hooks/useSwitchLang';
import useSwitchTheme from '../../../hooks/useSwitchTheme';
import {HouseIcon} from '../../svg/house.icon';
import {LogoutIcon} from '../../svg/logout.icon';
import {ProfileIcon} from '../../svg/profile.icon';

interface TogglesToDisplay {
    screenMode?: boolean;
    language?: boolean;
    logout?: boolean;
    profile?: boolean;
    home?: boolean;
}

interface PreferenceTogglesProps {
    togglesToDisplay: TogglesToDisplay;
}

export const PreferenceToggles = (props: PreferenceTogglesProps) => {
    const [colorTheme, setTheme] = useSwitchTheme();
    const [darkSide, setDarkSide] = useState(colorTheme === Theme.default);

    const {i18n} = useTranslation();
    const [displayLanguage, setLanguage] = useSwitchLang();
    const [language, setLang] = useState(displayLanguage === Lang.default);

    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    const toggleLanguage = (checked: boolean) => {
        setLanguage(displayLanguage);
        setLang(checked);
    };

    return (
        <div className="flex flex-row h-max space-x-10">
            {props.togglesToDisplay.screenMode && (
                <div className="bg-secondaryLight dark:bg-secondaryDark shadow p-0.5 rounded-xl w-max cursor-pointer">
                    <label className="flex flex-row justify-center items-center">
                        <i className="bi bi-brightness-high-fill text-black dark:text-white icon-size-m px-2 cursor-pointer"></i>
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
                <div className="bg-secondaryLight dark:bg-secondaryDark shadow p-0.5 rounded-xl w-max cursor-pointer">
                    <label className="flex flex-row justify-center items-center cursor-pointer">
                        <p className="font-bold text-black dark:text-white icon-size-m px-2">
                            DE
                        </p>
                        <input
                            type="checkbox"
                            checked={language}
                            onChange={(e) => toggleLanguage(e.target.checked)}
                            className="toggle toggle-md border-none bg-the_game_orange"
                        />
                        <p className="font-bold text-black dark:text-white icon-size-m px-2">
                            EN
                        </p>
                    </label>
                </div>
            )}

            <div className="flex flex-row space-x-4 bg-secondaryLight dark:bg-secondaryDark shadow px-2 rounded-xl">
                {props.togglesToDisplay.logout && (
                    <button className="flex items-center h-full px-2  ">
                        <LogoutIcon strokeColor="stroke-black dark:stroke-white fill-black dark:fill-white" />
                    </button>
                )}

                {props.togglesToDisplay.home && (
                    <button className="flex items-center h-full px-2 p-0.5">
                        <HouseIcon strokeColor="stroke-black dark:stroke-white fill-black dark:fill-white" />
                    </button>
                )}

                {props.togglesToDisplay.profile && (
                    <button className="flex items-center h-full px-2 ">
                        <ProfileIcon strokeColor="stroke-black dark:stroke-white fill-black dark:fill-white" />
                    </button>
                )}
            </div>
        </div>
    );
};
