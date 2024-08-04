import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const data = JSON.parse(storedAuth)
            setAuth(() => data);
        }
    }, []);

    const login = (userData) => {
        setAuth(()=> userData);
    };

    const logout = () => {
        setAuth(()=> null);
    };

    return (
        <AuthContext.Provider value={{ auth , login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
