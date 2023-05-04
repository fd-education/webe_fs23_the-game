import {ExclamationMarkIcon} from '../../svg/exclamation-mark.icon';

interface InputErrorProps {
    message: string;
}

export const InputError = (props: InputErrorProps) => {
    return (
        <div className="absolute top-7 transform -translate-y-1/2 right-2 z-50">
            <div
                className="tooltip tooltip-right tooltip-error"
                data-tip={props.message}
            >
                <ExclamationMarkIcon
                    strokeColor={'stroke-red-200 hover:stroke-red-800'}
                />
            </div>
        </div>
    );
};
