import React, {Component} from 'react';
import firebase from 'firebase';

import {Button, ButtonRow, Input} from '../../components';
import SignInFormError from './SignInFormError';

import './sign-in-form.css';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value,
            error: '',
        });
    };

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            error: '',
        });
    };

    onAuthStart = () => {
        this.setState(() => ({
            loading: true,
        }));
    };

    onAuthComplete = () => {
        this.setState(() => ({
            loading: false,
        }));
    };

    onSignIn = () => {
        this.onAuthStart();
        const auth = firebase.auth();
        const {email, password} = this.state;

        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.onAuthComplete();
            })
            .catch((error) => {
                console.log(error)
                this.setState(() => ({
                    error: error.message,
                    loading: false,
                }));
            })
    };

    onSignUp = () => {
        this.onAuthStart();
        const auth = firebase.auth();
        const {email, password} = this.state;

        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.onAuthComplete();
            })
            .catch((error) => {
                console.log(error)
                this.setState(() => ({
                    error: error.message,
                    loading: false,
                }));
            })
    };

    render() {
        const {email, password, error, loading} = this.state;

        return (
            <div className="sign-in-form-container">
                <div className="sign-in-form">
                    <Input label="Email"
                           onChange={this.onEmailChange}
                           type="email"
                           placeholder="user@example.com"
                           value={email}
                           disabled={loading}
                    />
                    <Input label="Password"
                           onChange={this.onPasswordChange}
                           type="password"
                           placeholder="password"
                           value={password}
                           disabled={loading}
                    />
                    <ButtonRow>
                        <Button onClick={this.onSignUp}
                                disabled={loading}
                        >
                            Sign up
                        </Button>
                        <Button onClick={this.onSignIn}
                                disabled={loading}
                        >
                            Sign in
                        </Button>
                    </ButtonRow>
                    <SignInFormError error={error}/>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {};
LoginForm.defaultProps = {};

export default LoginForm;
