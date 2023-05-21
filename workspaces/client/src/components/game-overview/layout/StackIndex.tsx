type StackIndexProps = {
    value: number;
};

export const StackIndex = (props: StackIndexProps) => {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full dark:bg-secondaryDark shadow-around shadow-shadowLight dark:shadow-shadowDark">
            <span className="font-medium text-black dark:text-white select-none">
                {props.value}
            </span>
        </div>
    );
};
