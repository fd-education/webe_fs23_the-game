import {SaveDownIcon} from './button-utils/SaveDownIcon';

export const SaveDownButton = () => {
    return (
        <button className="w-10 h-10 rounded-md bg-secondaryLight dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark">
            <SaveDownIcon />
        </button>
    );
};
