import React, {Component} from 'react';
import {connect} from 'react-redux';

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
        const {details, id} = this.props;
        const gameDetails = details[id];

        return (
            <div>
                <div>
                    Game details {!!id && `for game ${id}`}
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

function mapStateToProps({history: {gameDetails}}) {
    return {
        error: gameDetails.error,
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
