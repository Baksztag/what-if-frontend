import React from 'react';
import PropTypes from 'prop-types';

import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

import './header.css';

const Header = ({pathname}) => (
    <header className="wi-header">
        <HeaderLeft pathname={pathname}/>
        <HeaderRight pathname={pathname}/>
    </header>
);

Header.propTypes = {
    pathname: PropTypes.string.isRequired,
};
Header.defaultProps = {};

export default Header;
