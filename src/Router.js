import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import App from './App.js';

class AppRouter extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={App}/>
            </div>
        );
    }
}

AppRouter.propTypes = {};
AppRouter.defaultProps = {};

export default AppRouter;
