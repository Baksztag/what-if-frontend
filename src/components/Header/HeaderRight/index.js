import React from 'react';
import PropTypes from 'prop-types';

import getHeaderOptionClassName from '../HeaderOption/headerOptionClassName';
import HeaderOption from '../HeaderOption';
import LogoutButton from '../LogoutButton';

const HeaderRight = ({pathname}) => (
    <div className="wi-header-right">
        <HeaderOption label="Profile"
                      linkTo="/profile"
                      className={getHeaderOptionClassName(pathname, 'profile')}
        />
        <div className="wi-header-option">
            <LogoutButton className="header-button"/>
        </div>
    </div>
);

HeaderRight.propTypes = {
    pathname: PropTypes.string.isRequired,
};
HeaderRight.defaultProps = {};

export default HeaderRight;
