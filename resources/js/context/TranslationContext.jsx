import React, { createContext, useContext } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ translations, children }) => {
    return (
        <TranslationContext.Provider value={translations}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => {
    return useContext(TranslationContext);
};
