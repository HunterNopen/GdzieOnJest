import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to={'/addFavorite'}>
                <h3>Add a new route</h3>
            </Link>
        </div>
    );
};

export default FavoriteRoutes;
