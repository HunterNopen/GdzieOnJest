import React from 'react';
import { FavoriteItem } from '../types/Types';

interface FavoriteRoutesProps {
    favorites: FavoriteItem[];
    onDelete: (id: number) => void;
}

const FavoriteRoutes: React.FC<FavoriteRoutesProps> = ({ favorites, onDelete }) => {
    return (
        <div>
            <ul>
                {favorites.map(route => (
                    <li key={route.id}>
                        <span style={{ color: route.color }}>
                            {route.name} - {route.pointA} to {route.pointB}
                        </span>
                        <button onClick={() => onDelete(route.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteRoutes;
