export const Panel = (props: any) => {
    return (
        <div className="flex flex-col justify-end bg-secondaryLight dark:bg-secondaryDark h-full w-full rounded-2lg shadow-around p-3">
            {props.children}
        </div>
    );
};
