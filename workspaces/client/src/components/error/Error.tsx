import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

type ErrorProps = {
    message: string;
    onErrorClose?: () => void;
};

export const Error = (props: ErrorProps) => {
    const {t} = useTranslation();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        setMessage('errors.' + props.message);
    }, [props.message]);

    return (
        <div
            className="alert alert-error fixed max-w-xl w-max bottom-5 right-5 select-none hover:cursor-pointer animate-bounce "
            onClick={props.onErrorClose}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="break-words overflow-auto">{t(message)}</span>
        </div>
    );
};
