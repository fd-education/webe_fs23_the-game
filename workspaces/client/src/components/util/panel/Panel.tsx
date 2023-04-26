import React from 'react';

interface PanelProps {
    className?: string;
    children?: any;
}

export const Panel = (props: PanelProps) => {
    return (
        <div
            className={`flex flex-col bg-secondaryLight dark:bg-secondaryDark h-full w-full rounded-2lg shadow p-3 ${props.className}`}
        >
            {props.children}
        </div>
    );
};
