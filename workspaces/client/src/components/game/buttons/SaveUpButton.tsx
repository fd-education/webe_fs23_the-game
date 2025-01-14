import {SaveUpIcon} from './utils/SaveUpIcon';

type SaveUpButtonProps = {
    onClick: () => void;
    stackIndex: number;
};

export const SaveUpButton = (props: SaveUpButtonProps) => {
    return (
        <button
            className="w-10 h-10 rounded-md bg-secondaryLight dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark"
            onClick={props.onClick}
        >
            <SaveUpIcon stackIndex={props.stackIndex} />
        </button>
    );
};
