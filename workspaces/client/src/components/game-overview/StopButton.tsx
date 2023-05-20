import {StopIcon} from './button-utils/StopIcon';

export const StopButton = () => {
    return (
        <button className="w-10 h-10 rounded-md bg-secondaryLight dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark">
            <StopIcon />
        </button>
    );
};
