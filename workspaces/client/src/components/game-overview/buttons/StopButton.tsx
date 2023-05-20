import {StopIcon} from '../button-utils/StopIcon';

type StopButtonProps = {
    onClick: () => void;
};

export const StopButton = (props: StopButtonProps) => {
    return (
        <button
            className="w-10 h-10 rounded-md bg-secondaryLight dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark"
            onClick={props.onClick}
        >
            <StopIcon />
        </button>
    );
};
