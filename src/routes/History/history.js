import React, {Component} from 'react';
import PropTypes from 'prop-types';

import HistoryDetails from './HistoryDetails';
import HistoryError from './HistoryError';
import HistoryList from './HistoryList';
import HistoryLoader from './HistoryLoader';

class History extends Component {
    showDetails = (gameId) => {
        const {displayDetails} = this.props;

        displayDetails(gameId);
    };

    render() {
        const {error, games, hideDetails, id, loading} = this.props;

        return (
            <div className="history-container">
                {loading ?
                    (<HistoryLoader/>)
                    :
                    (error.length === 0 ?
                            (<HistoryList games={games}
                                          displayDetails={this.showDetails}
                                          hideDetails={hideDetails}
                            />)
                            :
                            (<HistoryError error={error}/>)
                    )
                }
                <HistoryDetails/>
            </div>
        );
    }
}

History.propTypes = {
    displayDetails: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    hideDetails: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    pushRoute: PropTypes.func.isRequired,
};
History.defaultProps = {};

export default History;
