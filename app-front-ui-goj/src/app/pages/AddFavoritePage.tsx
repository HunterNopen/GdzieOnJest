import React, { useState } from 'react';
import { FavoriteItem } from '../types/Types';
import {useFavorites} from "../services/FavoriteService.tsx";
import {Link} from "react-router-dom";

interface AddFavoritePageProps {
    addFavorite: (favorite: FavoriteItem) => void;
}

const AddFavoritePage: React.FC<AddFavoritePageProps> = () => {
    const { addFavorite } = useFavorites();
    const [newRoute, setNewRoute] = useState({
        name: '',
        pointA: '',
        pointB: '',
        color: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRoute(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddRoute = () => {
        if (newRoute.name && newRoute.pointA && newRoute.pointB && newRoute.color) {
            addFavorite({ ...newRoute, id: Date.now().toString() });
            setNewRoute({ name: '', pointA: '', pointB: '', color: '' });
        }
    };

    return (
        <div>
            <h2>Add a new route</h2>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Route Name"
                    value={newRoute.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="pointA"
                    placeholder="Point A"
                    value={newRoute.pointA}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="pointB"
                    placeholder="Point B"
                    value={newRoute.pointB}
                    onChange={handleInputChange}
                />
                <input
                    type="color"
                    name="color"
                    value={newRoute.color}
                    onChange={handleInputChange}
                />
                <Link to='/'>
                    <button
                        onClick={handleAddRoute}
                        disabled={!newRoute.name || !newRoute.pointA || !newRoute.pointB || !newRoute.color}
                    >
                        Add Route
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AddFavoritePage;
