import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../services/FavoriteService.tsx'; // Accessing useFavorites
import { useAuth } from '../services/AuthService.tsx'; // Import useAuth to get the token
import FindRouteForm from '../components/FindRouteForm.tsx';
import BusNumberInput from '../components/BusNumberInput.tsx';
import FavoriteRoutes from '../components/FavoriteRoutes.tsx';

const MainPage: React.FC = () => {
    const { favorites, deleteFavorite } = useFavorites();
    const { token } = useAuth();

    const handleDelete = async (id: string) => {
        await deleteFavorite(id);
    };

    return (
        <div>
            <h1>Main Page</h1>

            <FindRouteForm />
            <hr />
            <BusNumberInput />
            <hr />

            <h2>Favorite Routes</h2>

            {!token && (
                <p>You need to <Link to="/signin">sign in</Link> to view or add favorite routes.</p>
            )}

            {token && (
                <div>
                    <FavoriteRoutes favorites={favorites} onDelete={handleDelete} />
                </div>
            )}
        </div>
    );
};

export default MainPage;