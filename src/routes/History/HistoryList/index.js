import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Game} from '../../../models';

class HistoryList extends Component {
    render() {
        const {displayDetails, games} = this.props;

        return (
            <ul className="history-list">
                {_.size(games) > 0 ?
                    (_.map(games, (game, gameId) => (
                        <li key={gameId}
                            className="history-list-item"
                            onClick={() => displayDetails(gameId)}
                        >
                            <div className="history-list-item-label">
                                {Game.roomName(game)}
                            </div>
                            <div className="history-list-item-date">
                                {Game.date(game)}
                            </div>
                        </li>
                    )))
                    :
                    (<div>
                        No games played
                    </div>)
                }
            </ul>
        );
    }
}

HistoryList.propTypes = {
    displayDetails: PropTypes.func.isRequired,
    games: PropTypes.object.isRequired,
    hideDetails: PropTypes.func.isRequired,
};
HistoryList.defaultProps = {};

export default HistoryList;
