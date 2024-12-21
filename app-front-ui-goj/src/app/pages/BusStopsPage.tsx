import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BusStopsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const lineNumber = queryParams.get('lineNumber');
    const busStop = queryParams.get('busStop');

    const [busStops, setBusStops] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (lineNumber) {
            // Mock data
            const mockFetchStops = (line: string) => {
                const mockData = {
                    '870': [
                        {
                            name: 'Gdańsk, Brama Wyżynna',
                            scheduleUrl: '/schedules/870_Brama.pdf',
                        },
                        {
                            name: 'Sztutowo',
                            scheduleUrl: '/schedules/870_Sztutowo.pdf',
                        },
                    ],
                    '14': [
                        {
                            name: 'Sulęczyno',
                            scheduleUrl: '/schedules/14_Sulęczyno.pdf',
                        },
                        {
                            name: 'Łapalice, Jezioro',
                            scheduleUrl: '/schedules/14_Łapalice, Jezioro.Pdf',
                        },
                    ],
                };

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (mockData[line]) {
                            resolve(mockData[line]);
                        } else {
                            reject(new Error('Line not found'));
                        }
                    }, 1000);
                });
            };

            mockFetchStops(lineNumber)
                .then((data) => {
                    setBusStops(data);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    setBusStops([]);
                });
        }
    }, [lineNumber]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!busStop) {
        return (
            <div>
                <h1>Bus Stops for Line {lineNumber}</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {busStops.length > 0 ? (
                    <ul>
                        {busStops.map((stop, index) => (
                            <li key={index}>
                                {stop.name} -{' '}
                                <Link to={`/busStop?lineNumber=${lineNumber}&busStop=${encodeURIComponent(stop.name)}`}>
                                    View schedule
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !error && <p>Loading bus stops...</p>
                )}
                <button onClick={handleBackClick}>Back</button>
            </div>
        );
    } else {
        const selectedStop = busStops.find(stop => stop.name === busStop);
        if (selectedStop) {
            return (
                <div>
                    <h1>Schedule for Line {lineNumber} on {selectedStop.name}</h1>
                    <iframe
                        src={selectedStop.scheduleUrl}
                        title={`Schedule for ${selectedStop.name}`}
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    />
                    <button onClick={handleBackClick}>Back</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Schedule not found</h1>
                    <p>No schedule available for {busStop} on Line {lineNumber}.</p>
                    <button onClick={handleBackClick}>Back</button>
                </div>
            );
        }
    }
};

export default BusStopsPage;
