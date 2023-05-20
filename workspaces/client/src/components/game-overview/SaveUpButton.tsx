import {SaveUpIcon} from './button-utils/SaveUpIcon';

export const SaveUpButton = () => {
    return (
        <button className="w-10 h-10 rounded-md bg-secondaryLight dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark">
            <SaveUpIcon />
        </button>
    );
};
