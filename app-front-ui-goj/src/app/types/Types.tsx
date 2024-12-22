import React from "react";

export interface FavoriteItem {
    name: string;
    pointA: string;
    pointB: string;
    color: string;
}

export interface Route {
    buses: string[];
    duration: string;
    transfer: boolean;
}

export interface MainPageProps {
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface AuthContextProps {
    token: string | null;
    authSignIn: (token: string) => void;
    user: User;
    signOut: () => void;
}