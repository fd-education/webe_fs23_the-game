interface TogglesToDisplay {
    screenMode?: boolean;
    language?: boolean;
}

interface PreferenceTogglesProps {
    togglesToDisplay: TogglesToDisplay;
}

export const PreferenceToggles = (props: PreferenceTogglesProps) => {
    return (
        <div className="flex flex-row h-max space-x-10">
            {props.togglesToDisplay.screenMode && (
                <div className="bg-secondaryDark shadow-around p-0.5 rounded-xl w-max">
                    <label className="flex flex-row justify-center items-center">
                        <i className="bi bi-brightness-high-fill text-black dark:text-white icon-size-m px-2"></i>
                        <input
                            type="checkbox"
                            className="toggle toggle-md border-none bg-the_game_orange"
                        />
                        <i className="bi bi-moon-stars-fill text-black dark:text-white icon-size-m px-2"></i>
                    </label>
                </div>
            )}

            {props.togglesToDisplay.language && (
                <div className="bg-secondaryDark shadow-around p-0.5 rounded-xl w-max">
                    <label className="flex flex-row justify-center items-center">
                        <p className="font-bold text-white icon-size-m px-2">
                            DE
                        </p>
                        <input
                            type="checkbox"
                            className="toggle toggle-md border-none bg-the_game_orange"
                        />
                        <p className="font-bold text-white icon-size-m px-2">
                            EN
                        </p>
                    </label>
                </div>
            )}
        </div>
    );
};
