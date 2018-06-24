import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Game} from '../../../models';

class HistoryList extends Component {
    render() {
        const {games} = this.props;

        return (
            <ul className="history-list">
                {games.length > 0 ?
                    (games.map((game, index) => (
                        <li key={Game.id(game)}
                            className="history-list-item"
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
    games: PropTypes.array.isRequired,
};
HistoryList.defaultProps = {};

export default HistoryList;
