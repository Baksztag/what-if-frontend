import React from 'react';
import PropTypes from 'prop-types';

const Button = ({children, disabled, onClick}) => (
    <button className="wi-button"
            onClick={onClick}
            disabled={disabled}
    >
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
    disabled: false,
};

export default Button;
