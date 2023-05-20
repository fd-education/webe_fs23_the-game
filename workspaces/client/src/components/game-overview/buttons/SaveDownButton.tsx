import {SaveDownIcon} from '../button-utils/SaveDownIcon';

type SaveDownButtonProps = {
    onClick: () => void;
};
export const SaveDownButton = (props: SaveDownButtonProps) => {
    return (
        <button
            className="w-10 h-10 rounded-md bg-secondaryLight dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark"
            onClick={props.onClick}
        >
            <SaveDownIcon />
        </button>
    );
};
