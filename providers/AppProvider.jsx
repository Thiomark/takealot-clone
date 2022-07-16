import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <AppContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
            {children}
        </AppContext.Provider>
    )
}