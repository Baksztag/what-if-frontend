import React from 'react';
import {Link} from 'react-router-dom';

import {LogoutButton} from '../';

import './header.css';

function getHeaderOptionClassName(pathname, path) {
    return `header-button ${pathname === `/${path}` ? 'active' : ''}`;
}

const Header = ({pathname}) => (
    <header className="wi-header">
        <div className="wi-header-left">
            <div className="wi-header-option">
                <Link to="/lobby">
                    <button className={getHeaderOptionClassName(pathname, 'lobby')}>
                        Lobby
                    </button>
                </Link>
            </div>

            <div className="wi-header-option">
                <Link to="/history">
                    <button className={getHeaderOptionClassName(pathname, 'history')}>

                        History
                    </button>
                </Link>
            </div>

            <div className="wi-header-option">
                <Link to="/best">
                    <button className={getHeaderOptionClassName(pathname, 'best')}>
                        Best
                    </button>
                </Link>
            </div>
        </div>
        <div className="wi-header-right">
            <div className="wi-header-option">
                <Link to="/profile">
                    <button className={getHeaderOptionClassName(pathname, 'profile')}>
                        Profile
                    </button>
                </Link>
            </div>

            <div className="wi-header-option">
                <LogoutButton className="header-button"/>
            </div>
        </div>
    </header>
);

export default Header;
