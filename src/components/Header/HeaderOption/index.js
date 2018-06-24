import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import '../header.css';

const HeaderOption = ({className, label, linkTo}) => (
    <div className="wi-header-option">
        <Link to={linkTo}>
            <button className={className}>
                {label}
            </button>
        </Link>
    </div>
);

HeaderOption.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
};
HeaderOption.defaultProps = {
    className: '',
};

export default HeaderOption;
