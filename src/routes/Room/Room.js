import React, {Component} from 'react';
import PropTypes from 'prop-types';

import RoomNewQuestionForm from './RoomNewQuestionForm';
import RoomQuestionList from './RoomQuestionList';
import RoomReadyPanel from './RoomReadyPanel';
import RoomUserList from './RoomUserList';

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
                    <RoomUserList users={users}/>
                    <button onClick={leaveRoom}>
                        Leave room
                    </button>
                </div>
                ===============================
                <div>
                    <RoomQuestionList questions={questions}/>
                    <RoomNewQuestionForm newQuestion={newQuestion}
                                         onNewQuestionChange={this.onNewQuestionChange}
                                         onNewQuestionSubmit={this.onNewQuestionSubmit}
                    />
                    <RoomReadyPanel error={error}
                                    onReady={onReady}
                                    readyButtonDisabled={questions.length === 0}
                    />
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
