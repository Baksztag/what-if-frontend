import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {User} from '../../models';

class Room extends Component {
    state = {
        newQuestion: '',
    };

    onNewQuestionChange = (e) => {
        this.setState({
            newQuestion: e.target.value,
        });
    };

    componentDidMount() {
        const {getUsers, getQuestions,
            // subscribe
        } = this.props;

        // subscribe('user_list', ({users}) => {
        //     this.setState({
        //         users,
        //     })
        // });
        //
        // subscribe('user_joined', ({user}) => {
        //     this.setState(({users}) => ({
        //         users: users.concat(user),
        //     }))
        // });

        getUsers();
        getQuestions();
    }

    onNewQuestionSubmit = () => {
        const {addQuestion} = this.props;
        const {newQuestion} = this.state;

        addQuestion(newQuestion);
        this.setState({
            newQuestion: '',
        });
    };

    render() {
        const {leaveRoom, roomName, users, questions, onReady} = this.props;
        const {newQuestion} = this.state;
        console.log(users, questions)

        return (
            <div>
                <div>
                    Joined room {roomName}
                </div>
                <div>
                    <ul>
                        {users.map(user => (
                            <li key={User.id(user)}>
                                <span>
                                    {User.name(user)}
                                </span>
                                {User.isReady(user) && (
                                    <span>
                                        (ready)
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={leaveRoom}>
                        Leave room
                    </button>
                </div>
                ===============================
                <div>
                    {questions.length === 0 ?
                        (<div>
                            <span>
                                No questions added yet
                            </span>
                        </div>)
                        :
                        (<div>
                            <ul>
                                {questions.map((question, index) => (
                                    <li key={question + index}>
                                        <span>{question}</span>
                                        <div>X</div>
                                    </li>
                                ))}
                            </ul>
                        </div>)
                    }
                    <div>
                        <input type="text"
                               value={newQuestion}
                               onChange={this.onNewQuestionChange}
                        />
                        <button onClick={this.onNewQuestionSubmit}>
                            Add question
                        </button>
                    </div>
                    <div>
                        <button onClick={onReady}>
                            Ready!
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Room.propTypes = {
    addQuestion: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    getQuestions: PropTypes.func.isRequired,
    roomName: PropTypes.string.isRequired,
    subscribe: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    onReady: PropTypes.func.isRequired,
};
Room.defaultProps = {};

export default Room;
