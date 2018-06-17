import React, {Component} from 'react';
import firebase from 'firebase';

import {Button, ButtonRow, Input} from '../../components';

import './sign-in-form.css';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
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

    onSignIn = () => {
        const auth = firebase.auth();
        const {email, password} = this.state;

        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {})
            .catch((error) => {
                console.log(error)
                this.setState(() => ({
                    error: error.message,
                }));
            })
    };

    onSignUp = () => {
        const auth = firebase.auth();
        const {email, password} = this.state;

        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {})
            .catch((error) => {
                console.log(error)
                this.setState(() => ({
                    error: error.message,
                }));
            })
    };

    render() {
        const {email, password, error} = this.state;

        return (
            <div className="sign-in-form-container">
                <div className="sign-in-form">
                    <Input label="Email"
                           onChange={this.onEmailChange}
                           type="email"
                           placeholder="user@example.com"
                           value={email}
                    />
                    <Input label="Password"
                           onChange={this.onPasswordChange}
                           type="password"
                           placeholder="password"
                           value={password}
                           error={error}
                    />
                    <ButtonRow>
                        <Button onClick={this.onSignUp}>
                            Sign up
                        </Button>
                        <Button onClick={this.onSignIn}>
                            Sign in
                        </Button>
                    </ButtonRow>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {};
LoginForm.defaultProps = {};

export default LoginForm;
