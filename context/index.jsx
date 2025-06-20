"use client"

import {createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({
    hello:'world'
});

export function AppWrapper({children}) {
    const [toggleSideBar, setToggleSideBar] = useState(1)
    const [token, setToken] = useState(null);
    const [countLiked, setCountLiked] = useState(0);
    const [toggleLeft, setToggleLeft] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    
   
    return (
        <AppContext.Provider value={
        {
            countLiked,
            token,
            toggleSideBar,
            toggleLeft,
            loading,
            setLoading,
            setToggleLeft,
            setToken,
            setCountLiked,
            setToggleSideBar,
        }
        }>
            {children}

            
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}