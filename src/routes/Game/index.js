import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Button, Input} from '../../components';

class GameProvider extends Component {
    state = {
        game: [],
    };

    componentDidMount() {
        const {getQuestions} = this.props;

        getQuestions();
        this.prepareGame();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (!_.isEqual(prevProps.questions, this.props.questions)) {
            this.prepareGame();
        }
    }

    prepareGame = () => {
        const {questions} = this.props;

        this.setState(() => {
            return {
                game: questions.map(question => ({
                    question,
                    questionEnd: '',
                    answer: '',
                })),
            };
        });
    };

    onGameChange = (index, path) => {
        return (e) => {

            const value = e.target.value;
            this.setState(({game}) => {
                const nextGame = _.cloneDeep(game);

                _.set(nextGame, `${index}.${path}`, value);
                return {
                    game: nextGame,
                };
            });
        };
    };

    render() {
        const {finishGame} = this.props;
        const {game} = this.state;

        return (
            <div>
                {game.map((questionWithAnswer, index) => (
                    <div key={`${questionWithAnswer.question}_${index}`}
                         style={{
                             padding: "16px",
                         }}
                    >
                        <Input label={questionWithAnswer.question}
                               onChange={this.onGameChange(index, 'questionEnd')}
                               value={game[index].questionEnd}
                               error={game[index].questionEnd.length === 0 ? 'must not be empty' : ''}
                        />
                        <Input label="Asnwer: "
                               onChange={this.onGameChange(index, 'answer')}
                               value={game[index].answer}
                               error={game[index].answer.length === 0 ? 'must not be empty' : ''}
                        />
                    </div>
                ))}
                <Button onClick={() => {
                    console.log(game)
                    finishGame(game);
                }}>
                    Done
                </Button>
            </div>
        );
    }
}

GameProvider.propTypes = {
    finishGame: PropTypes.func.isRequired,
    getQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
};
GameProvider.defaultProps = {};

export default GameProvider;
