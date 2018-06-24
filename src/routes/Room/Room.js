import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {User} from '../../models';
import {Button, Input} from '../../components';

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
        const {getUsers, getQuestions} = this.props;

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
        const {leaveRoom, roomName, users, questions, onReady, error} = this.props;
        const {newQuestion} = this.state;

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
                        <Input type="text"
                               value={newQuestion}
                               onChange={this.onNewQuestionChange}
                               label="New question"
                        />
                        <Button onClick={this.onNewQuestionSubmit}>
                            Add question
                        </Button>
                    </div>
                    {error === 'no_questions_added' && (
                        <span>You can't be marked as ready when there are no questions</span>
                    )}
                    <div>
                        <Button onClick={onReady}
                                disabled={questions.length === 0}
                        >
                            Ready!
                        </Button>
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
    error: PropTypes.string,
};
Room.defaultProps = {
    error: '',
};

export default Room;
