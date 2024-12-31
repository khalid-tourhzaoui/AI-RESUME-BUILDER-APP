import { AlertCircle } from "lucide-react";

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 ' + className}
        >
            <AlertCircle size={20} className="text-red-600 inline-flex"/> {message}
        </p>
    ) : null;
}
