import React, {Component} from 'react';
import firebase from 'firebase';

import {Button, ButtonRow, Input} from '../../components';

import './sign-in-form.css';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    };

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    onSignIn = () => {
        const auth = firebase.auth();
        const {email, password} = this.state;

        auth.signInWithEmailAndPassword(email, password)
            .then((user) => console.log('Hello from ', user, ' in LoginForm!'))
            .catch((error) => console.log('Sounds good, doesn\'t work'))
    };

    onSignUp = () => {
        const auth = firebase.auth();
        const {email, password} = this.state;

        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => console.log('Hello from ', user, ' in LoginForm!'))
            .catch((error) => console.log('Sounds good, doesn\'t work'))
    };

    render() {
        const {email, password} = this.state;

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
