import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route } from '../types/Types'


const FromToPage: React.FC = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const from = queryParams.get('from') || '';
    const to = queryParams.get('to') || '';
    const date = queryParams.get('date') || '';
    const time = queryParams.get('time') || '';

    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const mockRoutes: Route[] = [
                { buses: ['Bus 101'], duration: '30 min', transfer: false },
                { buses: ['Bus 102', 'Bus 201'], duration: '50 min', transfer: true },
            ];
            setRoutes(mockRoutes);
        };

        fetchRoutes();
    }, [from, to, date, time]);

    return (
        <div>
            <h1>Routes from {from} to {to}</h1>
            {date && time && <p>Date: {date} | Time: {time}</p>}
            <div>
                {routes.length > 0 ? (
                    routes.map((route, index) => (
                        <div key={index}>
                            <h2>Option {index + 1}</h2>
                            <p>Buses: {route.buses.join(' → ')}</p>
                            <p>Duration: {route.duration}</p>
                            <p>Transfer Required: {route.transfer ? 'Yes' : 'No'}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading routes...</p>
                )}
            </div>
        </div>
    );
};

export default FromToPage;
