import React from 'react';
import {Link} from 'react-router-dom';

import {LogoutButton} from '../';

import './header.css';

const Header = ({}) => (
    <header className="wi-header">
        <div className="wi-header-left">
            <div className="wi-header-option">
                <button className="header-button">
                    <Link to="/lobby">
                        Lobby
                    </Link>
                </button>
            </div>

            <div className="wi-header-option">
                <button className="header-button">
                    <Link to="/history">
                        History
                    </Link>
                </button>
            </div>

            <div className="wi-header-option">
                <button className="header-button">
                    <Link to="/best">
                        Best
                    </Link>
                </button>
            </div>
        </div>
        <div className="wi-header-right">
            <div className="wi-header-option">
                <button className="header-button">
                    <Link to="/profile">
                        Profile
                    </Link>
                </button>
            </div>

            <div className="wi-header-option">
                <LogoutButton className="header-button"/>
            </div>
        </div>
    </header>
);

export default Header;
