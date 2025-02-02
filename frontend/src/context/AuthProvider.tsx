'use client'

import React, {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {keycloak} from "@/utils/keycloakInit";

interface AuthProviderProps {
    children: React.ReactNode
}

interface AuthContextType {
    userName: string;
    userId: string;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                const authenticated = await keycloak.init({onLoad: "login-required"});
                if (authenticated) {
                    setUserName(keycloak.tokenParsed?.preferred_username || "");
                    setUserId(keycloak.tokenParsed?.sub || "");
                    Cookies.set("accessToken", keycloak.token || "");
                    Cookies.set("refreshToken", "")
                } else {
                    await keycloak.login();
                }
            } catch (error) {
                console.error("Failed to initialize Keycloak:", error);
            } finally {
                setLoading(false);
            }
        };
        initKeycloak();
    }, []);

    const logout = async () => {
        await keycloak.logout();
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
    }

    if (loading)
        return <div>Loading...</div>

    return (
        <AuthContext.Provider value={{userId, userName, logout}}>
            {children}
        </AuthContext.Provider>
    )
}