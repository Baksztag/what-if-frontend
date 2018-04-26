import React, {Component} from 'react';

import AuthProvider from './Auth';

class AppProvider extends Component {
    render() {
        return (<AuthProvider/>);
    }
}

AppProvider.propTypes = {};
AppProvider.defaultProps = {};

export default AppProvider;
