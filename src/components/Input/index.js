import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

const Input = ({disabled, error, label, onChange, placeholder, type, value}) => {
    const errorOccurred = error.length > 0;

    return (
        <div className={c("wi-input-container", {disabled, errorOccurred})}>
        <span className="wi-input-label">
            {label}
        </span>
            <input type={type}
                   onChange={onChange}
                   disabled={disabled}
                   placeholder={placeholder}
                   value={value}
            />
            {errorOccurred &&
            (<span className="wi-input-error">
            {error}
        </span>)
            }
        </div>)
};

Input.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password']),
    value: PropTypes.string.isRequired,
};
Input.defaultProps = {
    disabled: false,
    error: '',
    placeholder: '',
    type: 'text',
};

export default Input;
