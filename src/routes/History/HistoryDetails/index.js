import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Game} from '../../../models';

import {displayGameDetails, getGameDetails, hideGameDetails} from '../../../actions';

class HistoryDetails extends Component {
    componentDidUpdate(prevProps) {
        const {id: prevId} = prevProps;
        const {id: nextId, details} = this.props;

        if (prevId !== nextId) {
            if (!details[nextId] && !!nextId) {
                this.props.getDetails(nextId);
            }
        }
    }

    render() {
        const {details, games, id} = this.props;
        const gameDetails = details[id];

        return (
            <div>
                <div>
                    Game details {!!id && `for game ${id} in room "${Game.roomName(games[id])}"`}
                </div>
                {
                    !!gameDetails ?
                        (<div>
                                Players:
                                <ul>
                                    {gameDetails.players.map((player, index) => (
                                        <li key={`${player}_${index}`}>
                                            {player}
                                        </li>
                                    ))}
                                </ul>
                                {_.isArray(gameDetails.q_and_a) &&
                                (<div>
                                    Result:
                                    <ul>
                                        {_.map(gameDetails.q_and_a, (qa, index) => (
                                            <li key={`${qa.question}_${index}`}>
                                                <div>
                                                    {qa.question}
                                                </div>
                                                <div>
                                                    {qa.answer}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>)
                                }
                            </div>

                        )
                        :
                        (<div>
                            Choose a game to display details
                        </div>)
                }

            </div>
        );
    }
}

function mapStateToProps({history: {games, gameDetails}}) {
    return {
        error: gameDetails.error,
        games,
        id: gameDetails.id,
        loading: gameDetails.isFetching,
        details: gameDetails.details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        displayDetails: (gameId) => dispatch(displayGameDetails(gameId)),
        getDetails: (gameId) => dispatch(getGameDetails(gameId)),
        hideDetails: (gameId) => dispatch(hideGameDetails(gameId)),
    };
}

HistoryDetails.propTypes = {};
HistoryDetails.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetails);
