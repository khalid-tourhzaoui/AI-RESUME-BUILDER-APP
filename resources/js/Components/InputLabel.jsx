import { BadgeCheck, Contact, KeySquare,Mails } from "lucide-react";

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-gray-700 my-2  ` +
                className
            }
        >
            {value ? value : children}
            {value === 'Email-Address' && (
                <>
                    <span className="inline-block mx-1">(</span>
                    <Mails size="18" className="inline-flex" />
                    <span className="inline-block mx-1">) :</span>
                </>
            )}
            {value === 'Name' && (
                <>
                    <span className="inline-block mx-1">(</span>
                    <Contact size="18" className="inline-flex"/>
                    <span className="inline-block mx-1">) :</span>
                </>
            )}
            {value === 'Password' && (
                <>
                    <span className="inline-block mx-1">(</span>
                    <KeySquare size="18" className="inline-flex"/>
                    <span className="inline-block mx-1">) :</span>
                </>
            )}
            {value === 'Confirm Password' && (
                <>
                    <span className="inline-block mx-1">(</span>
                    <BadgeCheck size="18" className="inline-flex"/>
                    <span className="inline-block mx-1">) :</span>
                </>
            )}
        </label>
    );
}
