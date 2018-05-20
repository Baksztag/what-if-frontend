import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import App from '../components/App.js';
import Lobby from '../routes/Lobby';
import {Header} from '../components';

class AppRouter extends Component {
    render() {
        console.log(this.props)

        return (
            <div id="wi" className="wi-container">


                <Header/>
                <div className="wi-content">
                    <Route exact path="/" component={App}/>
                    <Route exact path="/lobby" component={Lobby}/>
                </div>
            </div>
        );
    }
}

AppRouter.propTypes = {};
AppRouter.defaultProps = {};

export default withRouter(props => <AppRouter {...props}/>);
