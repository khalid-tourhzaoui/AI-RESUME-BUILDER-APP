import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function LangToggle() {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
    };

    useEffect(() => {

        setCurrentLanguage(i18n.language);
    }, [i18n.language]);

    const classNames = (isActive) =>
        `flex items-center gap-x-3 w-full text-left text-sm px-4 py-2 transition-colors duration-200 ${
            isActive || currentLanguage === i18n.language ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200 hover:text-gray-900'
        }`;

    return (
        <Menu className="relative text-gray-500 mt-1" as={'div'}>
            <MenuButton>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                    />
                </svg>
            </MenuButton>
            <MenuItems className="absolute w-auto right-0 top-full mt-2 border shadow-sm bg-white rounded-md">
                {/* Langue anglaise */}
                <MenuItem>
                    {({ active }) => (
                        <button
                            className={classNames(active)}
                            onClick={() => changeLanguage("en")}
                        >
                            <span className="fi fi-us"></span>
                        </button>
                    )}
                </MenuItem>
                {/* Langue française */}
                <MenuItem>
                    {({ active }) => (
                        <button
                            className={classNames(active)}
                            onClick={() => changeLanguage("fr")}
                        >
                            <span className="fi fi-fr"></span>
                        </button>
                    )}
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
