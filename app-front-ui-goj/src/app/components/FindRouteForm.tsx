import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindRouteForm: React.FC = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    const handleFind = () => {
        if (from && to) {
            navigate(`/from-to?from=${from}&to=${to}&date=${date}&time=${time}`);
        } else {
            alert('Please enter both "From" and "To" locations.');
        }
    };

    return (
        <form>
            <h1>Find Your Bus Route</h1>
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
    );
};

export default FindRouteForm;
