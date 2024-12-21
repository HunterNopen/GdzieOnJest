import { FavoriteItem } from '../types/Types';
import { useAuth } from './AuthService.tsx';
import { useEffect, useState } from 'react';

export const useFavorites = () => {
    const { token, user } = useAuth();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        const loadFavorites = () => {
            if (token && user?.email) {
                const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`) || '[]');
                setFavorites(storedFavorites);
            }
        };

        loadFavorites();
    }, [token, user]); // Rerun effect when token or user changes

    const addFavorite = (favorite: FavoriteItem) => {
        if (!token) throw new Error('User is not authenticated');
        if (!user?.email) throw new Error('User email is missing');

        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`) || '[]');
        storedFavorites.push(favorite);
        localStorage.setItem(`favorites_${user.email}`, JSON.stringify(storedFavorites));
        setFavorites(storedFavorites);
    };

    const updateFavorite = (id: string, updatedFavorite: FavoriteItem) => {
        if (!token) throw new Error('User is not authenticated');
        if (!user?.email) throw new Error('User email is missing');

        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`) || '[]');
        const index = storedFavorites.findIndex((fav: FavoriteItem) => fav.id === id);

        if (index !== -1) {
            storedFavorites[index] = { ...storedFavorites[index], ...updatedFavorite };
            localStorage.setItem(`favorites_${user.email}`, JSON.stringify(storedFavorites));
            setFavorites(storedFavorites);
            return storedFavorites[index];
        }

        return null;
    };

    const deleteFavorite = (id: string) => {
        if (!token) throw new Error('User is not authenticated');
        if (!user?.email) throw new Error('User email is missing');

        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`) || '[]');
        const updatedFavorites = storedFavorites.filter((fav: FavoriteItem) => fav.id !== id);
        localStorage.setItem(`favorites_${user.email}`, JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        return updatedFavorites;
    };

    return { favorites, addFavorite, updateFavorite, deleteFavorite };
};

