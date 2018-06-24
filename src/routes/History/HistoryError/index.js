import React from 'react';
import PropTypes from 'prop-types';

const HistoryError = ({error}) => (
    <div className="history-error">
        An error occurred while loading your history:
        <span>{error}</span>
    </div>
);

HistoryError.propTypes = {
    error: PropTypes.string.isRequired,
};
HistoryError.defaultProps = {};

export default HistoryError;
