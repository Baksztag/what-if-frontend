import React, {Component} from 'react';
import firebase from 'firebase';
import {BrowserRouter} from 'react-router-dom';
import _ from 'lodash';

import {API} from '../services';

import AppRouter from './Router';
import SignInForm from '../routes/SignIn/SignInForm';

class AuthProvider extends Component {
    state = {
        signedIn: false,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            API.saveUserToken(_.get(firebaseUser, '_lat', ''));

            if (firebaseUser) {
                this.setState({
                    signedIn: true,
                })
            } else {
                this.setState({
                    signedIn: false,
                })
            }
        })
    }

    render() {
        const {signedIn} = this.state;

        return (
            <div>
                {
                    signedIn ?
                        (<BrowserRouter>
                            <AppRouter/>
                        </BrowserRouter>)
                        :
                        (<SignInForm/>)
                }
            </div>
        );
    }
}

AuthProvider.propTypes = {};
AuthProvider.defaultProps = {};

export default AuthProvider;
