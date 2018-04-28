import React, {Component} from 'react';
import firebase from 'firebase';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './Router';
import SignInForm from '../routes/SignIn/SignInForm';

class AuthProvider extends Component {
    state = {
        signedIn: false,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            console.log('!!!', firebaseUser)

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
