import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useSwitchLang from '../../../hooks/useSwitchLang';
import useSwitchTheme from '../../../hooks/useSwitchTheme';
import AuthService from '../../../services/auth/auth.service';
import {HouseIcon} from '../../svg/house.icon';
import {LogoutIcon} from '../../svg/logout.icon';
import {MoonIcon} from '../../svg/moon.icon';
import {ProfileIcon} from '../../svg/profile.icon';
import {SunIcon} from '../../svg/sun.icon';

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
    const navigate = useNavigate();

    const [colorTheme, setTheme] = useSwitchTheme();
    const [darkSide, setDarkSide] = useState(colorTheme === Theme.default);

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

    const handleHomeClick = () => {
        navigate('/lobby');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        // noinspection JSIgnoredPromiseFromCall
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-row h-max space-x-10">
            {props.togglesToDisplay.screenMode && (
                <div className="shadow-light-around dark:shadow-dark-around bg-secondaryLight dark:bg-secondaryDark p-0.5 rounded-xl w-max cursor-pointer">
                    <label className="flex flex-row justify-center items-center space-x-2 p-1">
                        <SunIcon />
                        <input
                            type="checkbox"
                            checked={darkSide}
                            onChange={(e) => toggleDarkMode(e.target.checked)}
                            className="toggle toggle-md border-none bg-the_game_orange"
                        />
                        <MoonIcon />
                    </label>
                </div>
            )}

            {props.togglesToDisplay.language && (
                <div className="bg-secondaryLight dark:bg-secondaryDark shadow-light-around dark:shadow-dark-around p-0.5 rounded-xl w-max cursor-pointer">
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

            {props.togglesToDisplay.logout ||
            props.togglesToDisplay.home ||
            props.togglesToDisplay.profile ? (
                <div className="flex flex-row space-x-4 bg-secondaryLight dark:bg-secondaryDark shadow-light-around dark:shadow-dark-around px-2 rounded-xl">
                    {props.togglesToDisplay.logout && (
                        <button
                            className="flex items-center h-full px-2"
                            onClick={handleLogout}
                        >
                            <LogoutIcon strokeColor="stroke-black dark:stroke-white fill-black dark:fill-white" />
                        </button>
                    )}

                    {props.togglesToDisplay.home && (
                        <button
                            className="flex items-center h-full px-2"
                            onClick={handleHomeClick}
                        >
                            <HouseIcon />
                        </button>
                    )}

                    {props.togglesToDisplay.profile && (
                        <button
                            className="flex items-center h-full px-2"
                            onClick={handleProfileClick}
                        >
                            <ProfileIcon />
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
};
