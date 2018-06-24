import React from 'react';
import PropTypes from 'prop-types';

import '../sign-in-form.css';

const SignInFormError = ({error}) => (
    error.length !== 0 && (
        <span className="sign-in-form-error">
            {error}
        </span>
    )
);

SignInFormError.propTypes = {
    error: PropTypes.string.isRequired,
};
SignInFormError.defaultProps = {};

export default SignInFormError;
