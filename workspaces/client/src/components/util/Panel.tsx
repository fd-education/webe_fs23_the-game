export const Panel = (props: any) => {
    return (
        <div className="flex flex-col justify-end bg-secondaryDark h-[20rem] min-w-[33%] rounded-2lg shadow-around p-3">
            {props.children}
        </div>
    )
}