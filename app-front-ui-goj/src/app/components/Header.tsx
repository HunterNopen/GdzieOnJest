import React from 'react';
//import { useAppContext } from '../state/HomeService.tsx';

interface FooterProps {
    onClick: () => void;
}

const Header: React.FC<FooterProps> = ({ onClick }) => {
    return (
        <div className={"Header"} onClick={onClick}>
            {/*<img src={logo} alt="logo" />*/}
            <p>Gdzie ON jest</p>
        </div>
    );
};

export default Header;
