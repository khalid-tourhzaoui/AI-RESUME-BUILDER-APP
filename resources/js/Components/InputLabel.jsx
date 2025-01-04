import { BadgeCheck, Contact, KeySquare,Lock,Mails } from "lucide-react";

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
            {value === 'Email' && (
                <>
                    <span className="inline-block ms-1">(</span>
                    <Mails size="18" className="inline-flex" />
                    <span className="inline-block">) :</span>
                </>
            )}
            {value === 'Name' && (
                <>
                    <span className="inline-block ms-1">(</span>
                    <Contact size="18" className="inline-flex"/>
                    <span className="inline-block">) :</span>
                </>
            )}
            {(value === 'Password' || value === 'Current Password') && (
                <>
                    <span className="inline-block ms-1">(</span>
                    <KeySquare size="18" className="inline-flex"/>
                    <span className="inline-block">) :</span>
                </>
            )}
            {value === 'New Password' && (
                <>
                    <span className="inline-block ms-1">(</span>
                    <Lock size="18" className="inline-flex"/>
                    <span className="inline-block">) :</span>
                </>
            )}
            {value === 'Confirm Password' && (
                <>
                    <span className="inline-block ms-1">(</span>
                    <BadgeCheck size="18" className="inline-flex"/>
                    <span className="inline-block">) :</span>
                </>
            )}
        </label>
    );
}
