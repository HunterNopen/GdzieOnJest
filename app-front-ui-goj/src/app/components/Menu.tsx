import React from 'react';
import { Link } from 'react-router-dom';
// import konto from '../assets/icons/konto.png';
// import iconFAQ from '../assets/icons/FAQ.png';
// import Kontakt from '../assets/icons/kontakt.png';
// import info from '../assets/icons/info.png';

interface MenuProps {
    onClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClick }) => {
    return (
        <div className="Menu">
            <ul>
                <li onClick={onClick}>
                    <Link to="/">
                        {/*<img src={konto} alt="home.logo" />*/}
                        Main Page
                    </Link>
                </li>
                <li onClick={onClick}>
                    <Link to="/account">
                        {/*<img src={konto} alt="konto.jpg" />*/}
                        Konto
                    </Link>
                </li>
                <li onClick={onClick}>
                    <Link to="/FAQ">
                        {/*<img src={iconFAQ} alt="FAQ" />*/}
                        FAQ
                    </Link>
                </li>
                <li onClick={onClick}>
                    <Link to="/contact">
                        {/*<img src={Kontakt} alt="contact" />*/}
                        Kontakt
                    </Link>
                </li>
                <li onClick={onClick}>
                    <Link to="/info">
                        {/*<img src={info} alt="info" />*/}
                        O aplikacji
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
