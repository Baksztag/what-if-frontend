import React, {Component} from 'react';
import firebase from 'firebase';

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
            <div>
                <input value={email}
                       type="email"
                       placeholder="Email"
                       onChange={this.onEmailChange}
                />
                <input value={password}
                       type="password"
                       placeholder="Password"
                       onChange={this.onPasswordChange}
                />
                <button onClick={this.onSignUp}>Sign up</button>
                <button onClick={this.onSignIn}>Sign in</button>
            </div>
        );
    }
}

LoginForm.propTypes = {};
LoginForm.defaultProps = {};

export default LoginForm;
