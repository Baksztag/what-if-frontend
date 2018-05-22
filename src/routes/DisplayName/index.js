import React, {Component} from 'react';

import {API} from '../../services';

class DisplayNameForm extends Component {
    state = {
        name: ''
    };

    onDisplayNameChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onButtonClick = () => {
        const {name} = this.state;

        API.post('/display-name', {name})
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
    };

    render() {
        const {name} = this.state;

        return (
            <div>
                Looks like you have no name yet.
                Choose one below:
                <input type="text"
                       placeholder="Name"
                       onChange={this.onDisplayNameChange}
                       value={name}
                />
                <button onClick={this.onButtonClick}>OK</button>
            </div>
        );
    }
}

DisplayNameForm.propTypes = {};
DisplayNameForm.defaultProps = {};

export default DisplayNameForm;
