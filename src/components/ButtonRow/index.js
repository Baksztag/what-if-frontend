import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const ButtonRow = ({children}) => (
    <div className="wi-button-row">
        {children}
    </div>
);

ButtonRow.propTypes = {};
ButtonRow.defaultProps = {};

export default ButtonRow;
