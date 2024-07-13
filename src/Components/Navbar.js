import React from 'react';

const Navbar = ({ setActive, username, handleLogout }) => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <button onClick={() => setActive('home')}>Home</button>
                </li>
                <li>
                    <button onClick={() => setActive('employeeList')}>Employee List</button>
                </li>
                <li>
                    <span>{username}</span>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
