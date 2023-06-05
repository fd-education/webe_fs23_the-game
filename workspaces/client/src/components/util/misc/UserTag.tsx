type UserTagProps = {
    username: string;
};

export const UserTag = (props: UserTagProps) => {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
                {props.username.slice(0, 2).toUpperCase()}
            </span>
        </div>
    );
};
