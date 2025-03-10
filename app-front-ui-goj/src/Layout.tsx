import React, { useState } from 'react';
import './Layout.css';
import Header from './app/components/Header.tsx';
import Menu from './/app/components/Menu.tsx';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import PersonalPage from "./app/pages/PersonalPage.tsx";
import FAQPage from "./app/pages/FAQPage.tsx";
import ContactPage from ".//app/pages/ContactPage.tsx";
import AboutAppPage from ".//app/pages/AboutAppPage.tsx";
import BusStopsPage from "./app/pages/BusStopsPage.tsx";
import MainPage from ".//app/pages/MainPage.tsx";
import NotFoundException from ".//app/exceptions/NotFoundException.tsx";
import SignInPage from ".//app/pages/SignInPage.tsx";
import SignUpPage from ".//app/pages/SignUpPage.tsx";
import {AuthProvider, useAuth} from "./app/services/AuthService.tsx";
import AddFavoritePage from ".//app/pages/AddFavoritePage.tsx";
import FromToPage from ".//app/pages/FromToPage.tsx";

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { token } = useAuth();
    return token ? <>{element}</> : <Navigate to="/signin" replace />;
};

const Layout: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header onClick={toggleDropdown} />
                    {isDropdownOpen && <Menu onClick={toggleDropdown} />}
                    <div className="MainContent">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/account" element={<ProtectedRoute element={<PersonalPage />} />} />
                            <Route path="/FAQ" element={<FAQPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/info" element={<AboutAppPage />} />
                            <Route path="/busStop" element={<BusStopsPage />} />
                            <Route path="/addFavorite" element={<ProtectedRoute element={<AddFavoritePage />} />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/from-to" element={<FromToPage />} />
                            <Route path="/*" element={<NotFoundException />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default Layout;