import React, {ReactElement} from 'react';

interface PanelProps {
    className?: string;
    children?: ReactElement | ReactElement[];
}

export const Panel = (props: PanelProps) => {
    return (
        <div
            className={`flex flex-col shadow-light-around dark:shadow-dark-around h-full w-full rounded-2lg p-3 ${props.className}`}
        >
            {props.children}
        </div>
    );
};
