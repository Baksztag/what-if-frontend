import React, {Component} from 'react';
import {Provider} from 'react-redux';

import store from './store';
import AuthProvider from './Auth';

class AppProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <AuthProvider/>
            </Provider>
        );
    }
}

AppProvider.propTypes = {};
AppProvider.defaultProps = {};

export default AppProvider;
