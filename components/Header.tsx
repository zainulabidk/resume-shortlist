
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const activeLinkStyle = {
        color: '#007BFF',
        borderBottom: '2px solid #007BFF',
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold text-primary">
                    OfficeKir AI
                </NavLink>
                <div className="space-x-6">
                    <NavLink 
                        to="/candidate-form" 
                        className="text-gray-600 hover:text-primary pb-1"
                        style={({ isActive }) => isActive ? activeLinkStyle : {}}
                    >
                        Candidate Form
                    </NavLink>
                    <NavLink 
                        to="/admin-dashboard" 
                        className="text-gray-600 hover:text-primary pb-1"
                        style={({ isActive }) => isActive ? activeLinkStyle : {}}
                    >
                        Admin Dashboard
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
