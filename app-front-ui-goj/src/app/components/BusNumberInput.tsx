import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BusNumberInput: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <input
                type="number"
                placeholder="Enter bus number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Link to={`/busStop?lineNumber=${encodeURIComponent(inputValue)}`}>
                <button disabled={!inputValue}>Show Schedule</button>
            </Link>
        </div>
    );
};

export default BusNumberInput;
