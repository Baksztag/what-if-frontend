import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './Router';

class AppProvider extends Component {
    render() {
        return (
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        );
    }
}

AppProvider.propTypes = {};
AppProvider.defaultProps = {};

export default AppProvider;
