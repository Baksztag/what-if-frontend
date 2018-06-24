import React from 'react';

const Loader = ({children}) => (
    <div className="wi-loader-container">
        <div className="wi-loader">
            Loading...
            {children}
        </div>
    </div>
);

Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;
