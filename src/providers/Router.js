import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import {Best, HistoryProvider, Lobby, Profile, Welcome} from '../routes';
import {Header} from '../components';

class AppRouter extends Component {
    render() {
        const {location: {pathname}} = this.props;

        return (
                <div id="wi" className="wi-container">
                    <Header pathname={pathname}/>
                    <div className="wi-content">
                        <Route exact path="/" component={Welcome}/>
                        {/*<Route exact path="/lobby" component={Lobby}/>*/}
                        <Route exact path="/lobby" render={(props) => (
                            <Lobby {...props}/>
                        )}/>
                        <Route exact path="/history" component={HistoryProvider}/>
                        <Route exact path="/best" component={Best}/>
                        <Route exact path="/profile" component={Profile}/>
                    </div>
                </div>
        );
    }
}

AppRouter.propTypes = {};
AppRouter.defaultProps = {};

export default withRouter(props => <AppRouter {...props}/>);
