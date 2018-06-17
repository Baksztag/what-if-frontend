import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {API} from '../../services';
import {Input, Button} from '../../components';

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
        const {onRegisterSuccess} = this.props;
        const {name} = this.state;

        API.post('/display-name', {name})
            .then(onRegisterSuccess)
            .catch((e) => console.log(e))
    };

    render() {
        const {name} = this.state;

        return (
            <div>
                <Input type="text"
                       label="Your nickname: "
                       placeholder="Name"
                       onChange={this.onDisplayNameChange}
                       value={name}
                />
                <Button onClick={this.onButtonClick}>OK</Button>
            </div>
        );
    }
}

DisplayNameForm.propTypes = {
    onRegisterSuccess: PropTypes.func.isRequired,
};
DisplayNameForm.defaultProps = {};

export default DisplayNameForm;
