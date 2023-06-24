import {InputError} from './InputError';
import {useField} from 'formik';

interface FloatingLabelInputProps {
    label: string;
    name: string;
    type: string;
}

export const FloatingLabelInput = ({
    label,
    ...props
}: FloatingLabelInputProps) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className="relative margin">
                <input
                    {...field}
                    {...props}
                    className="block rounded-lg px-2.5 pb-1.5 pt-5 w-full text-sm text-gray-900 bg-white appearance-none focus:outline-none focus:ring-0 focus:border-0 focus:border-b-2 focus:border-b-the_game_purple peer"
                    placeholder=" "
                    autoComplete=""
                />
                <label
                    htmlFor={field.name}
                    className="pointer-events-none absolute text-sm text-gray-300 duration-300 top-3 z-10 origin-[0] left-2.5 scale-75 -translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5"
                >
                    {label}
                </label>
                {meta.touched && meta.error && (
                    <InputError message={meta.error} />
                )}
            </div>
        </>
    );
};
