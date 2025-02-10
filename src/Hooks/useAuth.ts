'use client'
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuth');
        setIsAuth(authStatus === 'true' ? true : true);
    }, []);

    const login = () => {
        localStorage.setItem('isAuth', 'true');
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('isAuth');
        setIsAuth(false);
    };

    return { isAuth, login, logout };
};