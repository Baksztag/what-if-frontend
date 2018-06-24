import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {User} from '../../models';

import Room from './Room';

import {webSocketConsumer} from "../../providers/webSocket/webSocketContext";
import Game from "../Game";

class RoomChannelProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            error: '',
            gameStarted: false,
            users: [],
            questions: [],
        };

        const {joinChannel, roomName} = props;

        this.channel = joinChannel(`room:${roomName}`, {}, this.onJoinSuccess, this.onJoinError)

        this.subscribe("user_left", (leavingUser) => {
            this.setState((prevState) => {
                const {users} = prevState;
                const index = _.findIndex(users, (user) => User.id(user) === User.id(leavingUser));

                if (index !== -1) {
                    users.splice(index, 1);
                    return {
                        users: [...users],
                    };
                }
            })
        });

        /**
         users: [{user, user_id}]
         */
        this.subscribe('user_list', ({users}) => {
            this.setState({
                users,
            })
        });

        this.subscribe('user_joined', (user) => {
            this.setState(({users}) => ({
                users: users.concat({
                    ...user,
                    ready: false,
                }),
            }))
        });

        this.subscribe('question_list', ({questions}) => {
            this.setState({
                questions,
            });
        });

        this.subscribe('new_question', ({question}) => {
            this.setState((prevState) => ({
                questions: prevState.questions.concat(question),
                error: prevState.error === 'no_questions_added' ? '' : prevState.error,
            }));
        });

        this.subscribe('ready', (data) => {
            const {game_started, user_id} = data;

            this.setState((prevState) => {
                const {users} = prevState;
                const index = _.findIndex(users, (user) => User.id(user) === user_id);

                if (index !== -1) {
                    const newUsers = [...users];
                    newUsers[index] = {
                        ...newUsers[index],
                        ready: true,
                    };

                    return {
                        users: newUsers,
                        gameStarted: game_started,
                    };
                }
            })
        });

        this.subscribe('player_finished', ({user_id, game_finished, q_and_a}) => {
            console.log('player', user_id, 'finished.', game_finished, q_and_a)
        });

        this.subscribe('error', ({reason}) => {
            this.setState(() => ({
                error: reason,
            }));
        });
    }

    onJoinSuccess = resp => {
        console.log("Joined successfully", resp)
        this.setState(prevState => ({
            connected: true,
            error: '',
        }));
    };

    onJoinError = resp => {
        console.log("Unable to join", resp)
        this.setState(prevState => ({
            connected: false,
            error: resp.reason,
        }))
    };

    subscribe = (message, onReceiveCallback) => {
        this.channel.on(message, onReceiveCallback);
    };

    getUsers = () => {
        this.channel.push('get_users', {});
    };

    leaveRoom = () => {
        // this.channel.push('leave_room', {})
        const {disconnectFromRoom} = this.props;

        this.channel.leave().receive("ok", () => {
            this.setState(() => ({
                connected: false,
                error: '',
                users: [],
            }), disconnectFromRoom)
        })
    };

    getQuestions = () => {
        this.channel.push('get_questions', {});
    };

    addQuestion = (question) => {
        this.channel.push('add_question', {question});
    };

    onReady = () => {
        this.channel.push('ready', {});
    };

    finishGame = (game) => {
        this.channel.push('finish_game', {
            game: game.map(questionAnswer => ({
                    question: questionAnswer.question + ' ' + questionAnswer.questionEnd,
                    answer: questionAnswer.answer,
                })
            )
        });
    };

    render() {
        const {roomName} = this.props;
        const {connected, error, gameStarted, questions, users} = this.state;
        return (
            <div>
                {connected ?
                    (gameStarted ?
                            (<Game getQuestions={this.getQuestions}
                                   questions={questions}
                                   finishGame={this.finishGame}
                            />)
                            :
                            (<Room roomName={roomName}
                                   addQuestion={this.addQuestion}
                                   subscribe={this.subscribe}
                                   getUsers={this.getUsers}
                                   getQuestions={this.getQuestions}
                                   leaveRoom={this.leaveRoom}
                                   users={users}
                                   questions={questions}
                                   onReady={this.onReady}
                                   error={error}
                            />)
                    )
                    :
                    (<div>
                        Joining room...
                    </div>)
                }


            </div>
        );
    }
}

RoomChannelProvider.propTypes = {
    disconnectFromRoom: PropTypes.func.isRequired,
    roomName: PropTypes.string.isRequired,
};
RoomChannelProvider.defaultProps = {};

export default webSocketConsumer(RoomChannelProvider);
