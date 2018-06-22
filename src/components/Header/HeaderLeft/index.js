import React from 'react';
import PropTypes from 'prop-types';

import getHeaderOptionClassName from '../HeaderOption/headerOptionClassName';
import HeaderOption from '../HeaderOption';

import '../header.css';

const HeaderLeft = ({pathname}) => (
    <div className="wi-header-left">
        <HeaderOption linkTo="/lobby"
                      label="Lobby"
                      className={getHeaderOptionClassName(pathname, 'lobby')}
        />
        <HeaderOption linkTo="/history"
                      label="History"
                      className={getHeaderOptionClassName(pathname, 'history')}
        />
        <HeaderOption linkTo="/best"
                      label="Best"
                      className={getHeaderOptionClassName(pathname, 'best')}
        />
    </div>
);

HeaderLeft.propTypes = {
    pathname: PropTypes.string.isRequired,
};
HeaderLeft.defaultProps = {};

export default HeaderLeft;
