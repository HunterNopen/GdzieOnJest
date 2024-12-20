import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "..//services/AuthContext.tsx";
// import {FavoriteItem} from "../types/Types";
import { deleteFavorite } from '../api/api';
import { MainPageProps } from '../types/Types'


const MainPage: React.FC<MainPageProps> = ({ favorites, setFavorites }) => {
    const [inputValue, setInputValue] = useState('');
    const { token } = useAuth();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        const updatedFavorites = await deleteFavorite(id);
        setFavorites(updatedFavorites);
    };

    const handleFind = () => {
        if (from && to) {
            navigate(`/from-to?from=${from}&to=${to}&date=${date}&time=${time}`);
        } else {
            alert('Please enter both "From" and "To" locations.');
        }
    };

    return (
        <div>
            <h1>Main Page</h1>

            <h1>Find Your Bus Route</h1>
            <form>
                <div>
                    <label>From: </label>
                    <input
                        type="text"
                        placeholder="Enter starting location"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div>
                    <label>To: </label>
                    <input
                        type="text"
                        placeholder="Enter destination"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date: </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Time: </label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleFind}>
                    Find
                </button>
            </form>

            <hr/>

            <input
                type="number"
                placeholder="Enter bus number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Link to={`/busStop?lineNumber=${encodeURIComponent(inputValue)}`}>
                <button disabled={!inputValue}>Show Schedule</button>
            </Link>

            <hr/>
            <h2>Favorite Routes</h2>

            {!token ? (
                <p>You need to <Link to="/signin">sign in</Link> to view or add favorite routes.</p>
            ) : (
                <div>
                    <ul>
                        {favorites.map(route => (
                            <li key={route.id}>
                                <span style={{color: route.color}}>
                                    {route.name} - {route.pointA} to {route.pointB}
                                </span>
                                <button onClick={() => handleDelete(route.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                    <Link to={'/addFavorite'}>
                        <h3>Add a new route</h3>
                    </Link>
                </div>
            )};
        </div>
    )
        ;
};

export default MainPage;
